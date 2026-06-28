import { Provider } from './index';
import { ProviderOptions } from './index';

export default function create(_opts: ProviderOptions): Provider {
  return {
    async generate(_code: string) {
      return '# (Anthropic) Placeholder Summary\n\nAnthropic provider is selected but not configured.';
    }
  };
}
