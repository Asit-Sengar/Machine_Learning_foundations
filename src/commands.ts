import * as vscode from 'vscode';
import { NotebookWatcher } from './notebookWatcher';
import { CellManager } from './cellManager';
import { MarkdownGenerator } from './markdownGenerator';
import { Settings } from './settings';
import { StatusBar } from './statusBar';

export function registerCommands(context: vscode.ExtensionContext, watcher: NotebookWatcher | undefined, cellManager: CellManager, markdownGen: MarkdownGenerator, settings: Settings, status: StatusBar) {
  context.subscriptions.push(vscode.commands.registerCommand('notebookAutodoc.generateForCell', async () => {
    const editor = vscode.window.activeNotebookEditor;
    if (!editor) return vscode.window.showInformationMessage('Open a notebook and focus a code cell to generate documentation.');
    const selection = editor.selections[0];
    const cellIndex = selection.start;
    await watcher?.generateForCell(editor.document, cellIndex);
  }));

  context.subscriptions.push(vscode.commands.registerCommand('notebookAutodoc.generateForNotebook', async () => {
    const editor = vscode.window.activeNotebookEditor;
    if (!editor) return vscode.window.showInformationMessage('Open a notebook to generate documentation.');
    for (let i = 0; i < editor.document.cellCount; i++) {
      const cell = editor.document.cellAt(i);
      if (cell.kind === vscode.NotebookCellKind.Code) {
        await watcher?.generateForCell(editor.document, i);
      }
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('notebookAutodoc.refreshAll', async () => {
    const editor = vscode.window.activeNotebookEditor;
    if (!editor) return vscode.window.showInformationMessage('Open a notebook to refresh documentation.');
    for (let i = 0; i < editor.document.cellCount; i++) {
      const cell = editor.document.cellAt(i);
      if (cell.kind === vscode.NotebookCellKind.Code) {
        await watcher?.generateForCell(editor.document, i);
      }
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('notebookAutodoc.toggleAuto', async () => {
    const cfg = vscode.workspace.getConfiguration('notebookAutodoc');
    const current = cfg.get('autoUpdate', true);
    await cfg.update('autoUpdate', !current, vscode.ConfigurationTarget.Global);
    status.updateEnabled(!current);
    vscode.window.showInformationMessage(`Auto documentation ${!current ? 'enabled' : 'disabled'}`);
  }));

  context.subscriptions.push(vscode.commands.registerCommand('notebookAutodoc.deleteGenerated', async () => {
    const editor = vscode.window.activeNotebookEditor;
    if (!editor) return vscode.window.showInformationMessage('Open a notebook to delete generated markdown.');
    const doc = editor.document;
    // remove markup cells that have autodocId
    for (let i = doc.cellCount - 1; i >= 0; i--) {
      const c = doc.cellAt(i);
      if (c.kind === vscode.NotebookCellKind.Markup && c.metadata?.custom?.autodocId) {
        const edit = new vscode.WorkspaceEdit();
        edit.replaceNotebookCells(doc.uri, new vscode.NotebookRange(i, 1), []);
        await vscode.workspace.applyEdit(edit);
      }
    }
    vscode.window.showInformationMessage('AutoDoc: Deleted generated markdown cells.');
  }));
}
