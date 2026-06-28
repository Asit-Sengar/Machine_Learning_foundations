import * as vscode from 'vscode';

export interface Config {
  provider: string;
  apiKey?: string;
  model?: string;
  debounceMs: number;
  maxTokens: number;
  temperature: number;
  autoUpdate: boolean;
}

export class Settings {
  private _disposable: vscode.Disposable | undefined;

  constructor() {
    this._disposable = vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('notebookAutodoc')) {
        // noop for now; consumers can re-read via .config
      }
    });
  }

  get config(): Config {
    const cfg = vscode.workspace.getConfiguration('notebookAutodoc');
    return {
      provider: cfg.get('provider', 'local'),
      apiKey: cfg.get('apiKey', ''),
      model: cfg.get('model', 'default'),
      debounceMs: cfg.get('debounceMs', 2500),
      maxTokens: cfg.get('maxTokens', 512),
      temperature: cfg.get('temperature', 0.2),
      autoUpdate: cfg.get('autoUpdate', true)
    };
  }

  dispose() {
    this._disposable?.dispose();
  }
}
