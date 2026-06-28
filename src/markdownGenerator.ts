import { Provider } from './provider';
import { Settings } from './settings';

export class MarkdownGenerator {
  constructor(private provider: Provider, private settings: Settings) {}

  async generate(code: string): Promise<string> {
    // Compose a prompt or pass code to provider
    try {
      const summary = await this.provider.generate(code, { model: this.settings.config.model });
      // Post-process to ensure beginner-friendly structure if needed
      return summary;
    } catch (err) {
      console.error('MarkdownGenerator: provider failed', err);
      throw err;
    }
  }
}
