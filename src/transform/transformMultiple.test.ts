import { describe, expect, test } from '@jest/globals';
import { transformMultiple } from 'transform/transformMultiple';

describe('transformMultiple', () => {
  test('single word', () => {
    expect(transformMultiple('het, \'t 1) art 2) pron 1) the 2) it')).toEqual({
      'het, \'t': [
        { partOfSpeech: 'art', translations: ['the'] },
        { partOfSpeech: 'pron', translations: ['it'] },
      ],
    });

    expect(transformMultiple('maat 1) noun, de 2) noun, de 3) noun, de(m) 1) size 2) rhythm 3) mate')).toEqual({
      maat: [
        { partOfSpeech: 'noun', article: 'de', translations: ['size'] },
        { partOfSpeech: 'noun', article: 'de', translations: ['rhythm'] },
        { partOfSpeech: 'noun', article: 'de(m)', translations: ['mate'] },
      ],
    });
  });
});

