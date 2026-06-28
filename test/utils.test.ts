import { expect } from 'chai';
import { makeId } from '../src/utils';

describe('Utils', () => {
  it('makeId returns unique strings', () => {
    const a = makeId();
    const b = makeId();
    expect(a).to.not.equal(b);
  });
});
