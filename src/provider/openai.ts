import { Provider } from './index';
import { ProviderOptions } from './index';

export default function create(opts: ProviderOptions): Provider {
  return {
    async generate(code: string) {
      // Placeholder: in production implement API calls to OpenAI
      // Keep same interface so switching providers is trivial
      console.log('OpenAI provider invoked with model', opts.model);
      // For safety return a simple placeholder
      return `# (OpenAI) Summary\n\nThis is a placeholder summary for the provided code.\n`;
    }
  };
}
