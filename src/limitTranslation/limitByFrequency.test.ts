import { expect, test } from '@jest/globals';
import { limitByFrequency } from 'limitTranslation/limitByFrequency';

test('limitTranslationsByFrequency empty', () => {
  expect(limitByFrequency({
    translationsByFrequency: {},
    maxPerFrequency: {
      common: 1,
      uncommon: 1,
      rare: 1,
    },
  })).toEqual({});

  expect(limitByFrequency({
    translationsByFrequency: {
      common: ['foo'],
    },
    maxPerFrequency: {},
  })).toEqual({
    common: ['foo'],
  });

  expect(limitByFrequency({
    translationsByFrequency: {
      common: ['foo'],
    },
    maxPerFrequency: {
      common: 0,
    },
  })).toEqual({});
});

test('limitTranslationsByFrequency single', () => {
  expect(limitByFrequency({
    translationsByFrequency: {
      common: ['foo'],
      uncommon: ['bar'],
      rare: ['baz'],
    },
    maxPerFrequency: {
      common: 1,
      uncommon: 1,
      rare: 1,
    },
  })).toEqual({
    common: ['foo'],
    uncommon: ['bar'],
    rare: ['baz'],
  });
});

test('limitTranslationsByFrequency multiple', () => {
  expect(limitByFrequency({
    translationsByFrequency: {
      common: ['foo', 'foo'],
      uncommon: ['bar', 'bar'],
      rare: ['baz', 'baz'],
    },
    maxPerFrequency: {
      common: 1,
      uncommon: 1,
      rare: 1,
    },
  })).toEqual({
    common: ['foo'],
    uncommon: ['bar'],
    rare: ['baz'],
  });

  expect(limitByFrequency({
    translationsByFrequency: {
      common: ['foo', 'foo', 'foo'],
    },
    maxPerFrequency: {
      common: 999,
      uncommon: 1,
      rare: 1,
    },
  })).toEqual({
    common: ['foo', 'foo', 'foo'],
  });
});

test('limitTranslationsByFrequency redundant frequency', () => {
  expect(limitByFrequency({
    translationsByFrequency: {
      common: ['foo'],
      uncommon: ['bar', 'bar'],
    },
    maxPerFrequency: {
      common: 0,
      uncommon: 1,
      rare: 1,
    },
  })).toEqual({
    uncommon: ['bar'],
  });
});

test('limitTranslationsByFrequency redundant part of speech', () => {
  expect(limitByFrequency({
    translationsByFrequency: {
      common: ['foo'],
    },
    maxPerFrequency: {
      common: 0,
      uncommon: 1,
      rare: 1,
    },
  })).toEqual({});
});
