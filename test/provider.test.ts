import { expect } from 'chai';
import { ProviderFactory } from '../src/provider';
import { Settings } from '../src/settings';

describe('Provider abstraction', () => {
  it('creates local provider by default and generates markdown', async () => {
    const settings = new Settings();
    const provider = ProviderFactory.create('local', settings);
    const md = await provider.generate('import pandas as pd\n\ndf = pd.read_csv("wine.csv")');
    expect(md).to.be.a('string');
    expect(md.length).to.be.greaterThan(10);
  });
});
