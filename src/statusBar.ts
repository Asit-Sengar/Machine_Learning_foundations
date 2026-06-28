import * as vscode from 'vscode';

export class StatusBar {
  private item: vscode.StatusBarItem;
  private progressItem: vscode.StatusBarItem;
  private enabled = true;

  constructor() {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    this.progressItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
    this.updateEnabled(true);
    this.item.show();
  }

  updateEnabled(on: boolean) {
    this.enabled = on;
    this.item.text = on ? '🟢 Auto Documentation ON' : '⚪ Auto Documentation OFF';
  }

  showProgress(on: boolean) {
    if (on) {
      this.progressItem.text = '$(sync~spin) Generating...';
      this.progressItem.show();
    } else {
      this.progressItem.hide();
    }
  }

  dispose() {
    this.item.dispose();
    this.progressItem.dispose();
  }
}
