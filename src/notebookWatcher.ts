import * as vscode from 'vscode';
import { CellManager } from './cellManager';
import { MarkdownGenerator } from './markdownGenerator';
import { Settings } from './settings';
import { StatusBar } from './statusBar';
import { isCodeCell } from './utils';

export class NotebookWatcher implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];
  private typingTimers: Map<string, NodeJS.Timeout> = new Map();
  private inProgress: Set<string> = new Set();

  constructor(
    private cellManager: CellManager,
    private markdownGen: MarkdownGenerator,
    private settings: Settings,
    private status: StatusBar
  ) {}

  start(context: vscode.ExtensionContext) {
    // Listen to text document changes (notebook cell documents fire here)
    this.disposables.push(vscode.workspace.onDidChangeTextDocument(ev => this.onTextChanged(ev)));

    // Notebook structural changes
    this.disposables.push(vscode.workspace.onDidChangeNotebookDocument(ev => this.onNotebookChanged(ev)));

    // Active editor change to update status
    this.disposables.push(vscode.window.onDidChangeActiveNotebookEditor(editor => {
      // no-op for now
    }));

    context.subscriptions.push(this);
  }

  dispose() {
    this.disposables.forEach(d => d.dispose());
  }

  private onTextChanged(e: vscode.TextDocumentChangeEvent) {
    // find if this document belongs to a notebook cell
    const notebookDocs = vscode.workspace.notebookDocuments;
    for (const nb of notebookDocs) {
      for (let i = 0; i < nb.cellCount; i++) {
        const cell = nb.cellAt(i);
        if (cell.document && cell.document.uri.toString() === e.document.uri.toString()) {
          if (!isCodeCell(cell)) return;
          if (!this.settings.config.autoUpdate) return;
          const key = `${nb.uri.toString()}::${i}`;
          const delay = this.settings.config.debounceMs;
          if (this.typingTimers.has(key)) clearTimeout(this.typingTimers.get(key)!);
          const t = setTimeout(() => {
            this.typingTimers.delete(key);
            this.generateForCell(nb, i).catch(err => console.error('AutoDoc error', err));
          }, delay);
          this.typingTimers.set(key, t);
          return;
        }
      }
    }
  }

  private async onNotebookChanged(e: vscode.NotebookDocumentChangeEvent) {
    // Handle deletions and moves: if a code cell is deleted, remove its markdown
    for (const change of e.changes) {
      // If cells were removed, attempt to find metadata and remove paired markdown
      if (change.deleted) {
        for (const c of change.deleted) {
          if (isCodeCell(c)) {
            // remove its markdown by id
            try {
              await this.cellManager.deletePairForCode(e.document, c.index);
            } catch (err) {
              console.error('Failed to delete paired markdown', err);
            }
          }
        }
      }
    }
  }

  async generateForCell(notebook: vscode.NotebookDocument, codeIndex: number) {
    const key = `${notebook.uri.toString()}::${codeIndex}`;
    if (this.inProgress.has(key)) return;
    this.inProgress.add(key);
    this.status.showProgress(true);
    try {
      // Ensure markdown exists above
      const mdIndex = await this.cellManager.ensurePairAbove(notebook, codeIndex + 0);
      // Re-open notebook document to get fresh indices
      const nb = await vscode.workspace.openNotebookDocument(notebook.uri);
      // The code cell might have shifted; find matching by autodoc id
      const codeCell = nb.cellAt(mdIndex + 1);
      const code = codeCell.document.getText();
      const generated = await this.markdownGen.generate(code);
      // replace markdown cell contents
      const edit = new vscode.WorkspaceEdit();
      const mdCell = nb.cellAt(mdIndex);
      const newMd = new vscode.NotebookCellData(vscode.NotebookCellKind.Markup, generated, 'markdown');
      edit.replaceNotebookCells(nb.uri, new vscode.NotebookRange(mdIndex, 1), [newMd]);
      await vscode.workspace.applyEdit(edit);
    } catch (err) {
      vscode.window.showErrorMessage('AutoDoc: Failed to generate documentation. See console for details.');
      console.error(err);
    } finally {
      this.inProgress.delete(key);
      this.status.showProgress(false);
    }
  }
}
