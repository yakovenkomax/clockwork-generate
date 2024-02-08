import { removeWord } from 'cleanTranslation/removeWord';
import { expect, test } from '@jest/globals';

test('removeFromTranslations single entry', () => {
  expect(removeWord({
      main: '',
      partsOfSpeech: {
        verb: {
          common: ['foo', 'bar'],
          uncommon: ['bar', 'baz'],
          rare: ['baz', 'qux'],
        },
      },
    },
    'foo',
  )).toEqual({
    main: '',
    partsOfSpeech: {
      verb: {
        common: ['bar'],
        uncommon: ['bar', 'baz'],
        rare: ['baz', 'qux'],
      },
    },
  });
});

test('removeFromTranslations multiple entries', () => {
  expect(removeWord({
      main: '',
      partsOfSpeech: {
        verb: {
          common: ['foo', 'foo', 'bar'],
          uncommon: ['foo', 'baz'],
          rare: ['foo', 'qux'],
        },
      },
    },
    'foo',
  )).toEqual({
    main: '',
    partsOfSpeech: {
      verb: {
        common: ['bar'],
        uncommon: ['baz'],
        rare: ['qux'],
      },
    },
  });
});

test('removeFromTranslations with frequency redundancy', () => {
  expect(removeWord({
      main: '',
      partsOfSpeech: {
        verb: {
          common: ['foo'],
          uncommon: ['bar', 'baz'],
        },
      },
    },
    'foo',
  )).toEqual({
    main: '',
    partsOfSpeech: {
      verb: {
        uncommon: ['bar', 'baz'],
      },
    },
  });
});

test('removeFromTranslations with part of speech redundancy', () => {
  expect(removeWord({
      main: '',
      partsOfSpeech: {
        verb: {
          common: ['foo'],
        },
      },
    },
    'foo',
  )).toEqual({
    main: '',
  });
});

