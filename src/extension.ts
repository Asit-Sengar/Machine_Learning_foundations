import * as vscode from 'vscode';
import { NotebookWatcher } from './notebookWatcher';
import { CellManager } from './cellManager';
import { MarkdownGenerator } from './markdownGenerator';
import { ProviderFactory } from './provider';
import { Settings } from './settings';
import { registerCommands } from './commands';
import { StatusBar } from './statusBar';

let watcher: NotebookWatcher | undefined;

export async function activate(context: vscode.ExtensionContext) {
  console.log('Activating Notebook AutoDoc extension');

  const settings = new Settings();
  const provider = ProviderFactory.create(settings.config.provider, settings.config);
  const markdownGen = new MarkdownGenerator(provider, settings);
  const cellManager = new CellManager();
  const status = new StatusBar();

  watcher = new NotebookWatcher(cellManager, markdownGen, settings, status);
  watcher.start(context);

  registerCommands(context, watcher, cellManager, markdownGen, settings, status);

  context.subscriptions.push(status);
  context.subscriptions.push(cellManager);
  context.subscriptions.push(watcher);

  console.log('Notebook AutoDoc activated');
}

export function deactivate() {
  console.log('Deactivating Notebook AutoDoc');
  if (watcher) {
    watcher.dispose();
  }
}
