import { Settings } from '../settings';

export interface ProviderOptions {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface Provider {
  generate(code: string, context?: object): Promise<string>;
}

export class ProviderFactory {
  static create(name: string, settings: Settings): Provider {
    const opts: ProviderOptions = {
      apiKey: settings.config.apiKey,
      model: settings.config.model,
      maxTokens: settings.config.maxTokens,
      temperature: settings.config.temperature
    };

    switch (name) {
      case 'openai':
        // lazy load to avoid heavy deps
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require('./openai').default(opts);
      case 'anthropic':
        return require('./anthropic').default(opts);
      case 'gemini':
        return require('./gemini').default(opts);
      case 'ollama':
        return require('./ollama').default(opts);
      default:
        return require('./local').default(opts);
    }
  }
}
