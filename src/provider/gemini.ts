import { Provider } from './index';
import { ProviderOptions } from './index';

export default function create(_opts: ProviderOptions): Provider {
  return {
    async generate(_code: string) {
      return '# (Gemini) Placeholder Summary\n\nGemini provider selected but not configured.';
    }
  };
}
