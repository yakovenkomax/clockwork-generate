import { expect, test } from '@jest/globals';
import { limitByPartOfSpeech } from 'limitTranslation/limitByPartOfSpeech';

test('limitTranslationsByPartOfSpeech empty', () => {
  expect(limitByPartOfSpeech({
    translationsByFrequency: {},
    maxPerPartOfSpeech: 100,
  })).toEqual({});

  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      common: [],
    },
    maxPerPartOfSpeech: 100,
  })).toEqual({});

  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      common: ['foo'],
      uncommon: ['bar'],
      rare: ['baz'],
    },
    maxPerPartOfSpeech: 0,
  })).toEqual({});
});

test('limitTranslationsByPartOfSpeech single', () => {
  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      common: ['foo', 'foo', 'foo'],
      uncommon: ['bar', 'bar', 'bar'],
      rare: ['baz', 'baz', 'baz'],
    },
    maxPerPartOfSpeech: 1,
  })).toEqual({
    common: ['foo'],
  });

  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      uncommon: ['bar', 'bar', 'bar'],
      rare: ['baz', 'baz', 'baz'],
    },
    maxPerPartOfSpeech: 1,
  })).toEqual({
    uncommon: ['bar'],
  });

  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      rare: ['baz', 'baz', 'baz'],
    },
    maxPerPartOfSpeech: 1,
  })).toEqual({
    rare: ['baz'],
  });
});

test('limitTranslationsByPartOfSpeech multiple', () => {
  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      common: ['foo', 'foo', 'foo'],
      uncommon: ['bar', 'bar', 'bar'],
      rare: ['baz', 'baz', 'baz'],
    },
    maxPerPartOfSpeech: 4,
  })).toEqual({
    common: ['foo', 'foo', 'foo'],
    uncommon: ['bar'],
  });

  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      uncommon: ['bar', 'bar', 'bar'],
      rare: ['baz', 'baz', 'baz'],
    },
    maxPerPartOfSpeech: 4,
  })).toEqual({
    uncommon: ['bar', 'bar', 'bar'],
    rare: ['baz'],
  });

  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      rare: ['baz', 'baz', 'baz'],
    },
    maxPerPartOfSpeech: 4,
  })).toEqual({
    rare: ['baz', 'baz', 'baz'],
  });

  expect(limitByPartOfSpeech({
    translationsByFrequency: {
      common: ['foo'],
      uncommon: ['bar'],
      rare: ['baz', 'baz', 'baz'],
    },
    maxPerPartOfSpeech: 4,
  })).toEqual({
    common: ['foo'],
    uncommon: ['bar'],
    rare: ['baz', 'baz'],
  });
});
