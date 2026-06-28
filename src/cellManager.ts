import * as vscode from 'vscode';
import { makeId, isCodeCell } from './utils';

// Manages pairing between code cells and generated markdown cells via metadata
export class CellManager implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];

  constructor() {}

  dispose() {
    this.disposables.forEach(d => d.dispose());
  }

  getPairId(cell: vscode.NotebookCell): string | undefined {
    return cell.metadata?.custom?.autodocId as string | undefined;
  }

  setPairId(edit: vscode.WorkspaceEdit | undefined, cell: vscode.NotebookCell, id: string) {
    // set metadata on cell
    const notebook = cell.notebook;
    const editBuilder = new vscode.WorkspaceEdit();
    const newMeta = Object.assign({}, cell.metadata, { custom: Object.assign({}, (cell.metadata?.custom || {}), { autodocId: id }) });
    editBuilder.replaceNotebookCellMetadata(notebook.uri, cell.index, newMeta);
    return editBuilder;
  }

  async ensurePairAbove(notebook: vscode.NotebookDocument, codeIndex: number): Promise<number> {
    const codeCell = notebook.cellAt(codeIndex);
    if (!isCodeCell(codeCell)) return -1;
    let id = this.getPairId(codeCell);
    if (!id) {
      id = makeId();
      const edit = new vscode.WorkspaceEdit();
      edit.replaceNotebookCellMetadata(notebook.uri, codeIndex, Object.assign({}, codeCell.metadata, { custom: Object.assign({}, (codeCell.metadata?.custom || {}), { autodocId: id }) }));
      // create markdown cell above
      const mdCell = new vscode.NotebookCellData(vscode.NotebookCellKind.Markup, '# Generating documentation...', 'markdown');
      edit.replaceNotebookCells(notebook.uri, new vscode.NotebookRange(codeIndex, 0), [mdCell]);
      await vscode.workspace.applyEdit(edit);
      // after edit the markdown is at codeIndex and code cell moved to codeIndex+1
      return codeIndex; // index of newly created markdown
    } else {
      // ensure there's a markdown above with same id
      if (codeIndex === 0) return -1;
      const above = notebook.cellAt(codeIndex - 1);
      if (above && above.kind === vscode.NotebookCellKind.Markup && (above.metadata?.custom?.autodocId === id || !above.metadata?.custom?.autodocId)) {
        // ensure markdown has id
        if (!above.metadata?.custom?.autodocId) {
          const edit = new vscode.WorkspaceEdit();
          edit.replaceNotebookCellMetadata(notebook.uri, above.index, Object.assign({}, above.metadata, { custom: Object.assign({}, (above.metadata?.custom || {}), { autodocId: id }) }));
          await vscode.workspace.applyEdit(edit);
        }
        return above.index;
      } else {
        // create markdown above
        const edit = new vscode.WorkspaceEdit();
        const mdCell = new vscode.NotebookCellData(vscode.NotebookCellKind.Markup, '# Generating documentation...', 'markdown');
        edit.replaceNotebookCells(notebook.uri, new vscode.NotebookRange(codeIndex, 0), [mdCell]);
        await vscode.workspace.applyEdit(edit);
        // set metadata on both
        const newNotebook = await vscode.workspace.openNotebookDocument(notebook.uri);
        const newMd = newNotebook.cellAt(codeIndex);
        const code = newNotebook.cellAt(codeIndex + 1);
        const metaEdit = new vscode.WorkspaceEdit();
        metaEdit.replaceNotebookCellMetadata(notebook.uri, newMd.index, Object.assign({}, newMd.metadata, { custom: Object.assign({}, (newMd.metadata?.custom || {}), { autodocId: id }) }));
        metaEdit.replaceNotebookCellMetadata(notebook.uri, code.index, Object.assign({}, code.metadata, { custom: Object.assign({}, (code.metadata?.custom || {}), { autodocId: id }) }));
        await vscode.workspace.applyEdit(metaEdit);
        return newMd.index;
      }
    }
  }

  findMarkdownForCode(notebook: vscode.NotebookDocument, codeCellIndex: number): number | undefined {
    const codeCell = notebook.cellAt(codeCellIndex);
    const id = this.getPairId(codeCell);
    if (!id) return undefined;
    for (let i = 0; i < notebook.cellCount; i++) {
      const c = notebook.cellAt(i);
      if (c.kind === vscode.NotebookCellKind.Markup && c.metadata?.custom?.autodocId === id) return i;
    }
    return undefined;
  }

  async deletePairForCode(notebook: vscode.NotebookDocument, codeCellIndex: number) {
    const mdIndex = this.findMarkdownForCode(notebook, codeCellIndex);
    if (mdIndex !== undefined) {
      const edit = new vscode.WorkspaceEdit();
      edit.replaceNotebookCells(notebook.uri, new vscode.NotebookRange(mdIndex, 1), []);
      await vscode.workspace.applyEdit(edit);
    }
  }
}
