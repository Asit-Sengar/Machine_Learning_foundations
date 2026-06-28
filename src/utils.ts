import * as vscode from 'vscode';

export function makeId(): string {
  try {
    // Node 14+ has crypto.randomUUID
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto');
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
  } catch (e) {
    // ignore
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
}

export function isCodeCell(cell: vscode.NotebookCell): boolean {
  const lang = cell.document.languageId || '';
  return !(cell.kind === vscode.NotebookCellKind.Markup) && !['markdown','md'].includes(lang.toLowerCase());
}
