import { Provider } from './index';
import { ProviderOptions } from './index';

// Local provider: simple heuristic-based generator for offline or testing
export default function create(_opts: ProviderOptions): Provider {
  return {
    async generate(code: string) {
      // Very small heuristic summarizer - production should use real LLM
      const firstLine = code.split('\n').find(l => l.trim().length > 0) || '';
      const imports = [] as string[];
      const lines = code.split('\n');
      for (const l of lines) {
        if (/^\s*import\s+/i.test(l) || /^\s*from\s+\w+/i.test(l)) {
          imports.push(l.trim());
        }
      }

      const title = (firstLine.length > 0) ? firstLine.trim().slice(0, 60) : 'Code Cell';

      const mdLines = [] as string[];
      mdLines.push(`# ${title}`);
      mdLines.push('');
      mdLines.push(`This cell contains the following code snippet. It performs the operations shown and may use libraries listed below.`);
      mdLines.push('');
      if (imports.length) {
        mdLines.push('**Important libraries used:**');
        for (const imp of imports) mdLines.push(`- ${imp}`);
        mdLines.push('');
      }
      mdLines.push('**Purpose:**');
      mdLines.push('- Brief description of what this cell does.');
      mdLines.push('');
      mdLines.push('**Inputs:**');
      mdLines.push('- Describe inputs (variables, files, dataframes).');
      mdLines.push('');
      mdLines.push('**Outputs:**');
      mdLines.push('- Describe outputs (variables, returned values).');
      mdLines.push('');
      mdLines.push('**Notes:**');
      mdLines.push('- Add any ML/data-science concepts or caveats here.');

      return mdLines.join('\n');
    }
  };
}
