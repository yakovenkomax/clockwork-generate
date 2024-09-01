import { describe, expect, test } from '@jest/globals';
import { transformSingle } from 'transform/transformSingle';

describe('transformSingle', () => {
  test('single word', () => {
    expect(transformSingle('de art the')).toEqual({
      de: [{
        partOfSpeech: 'art',
        translations: ['the'],
      }],
    });

    expect(transformSingle('zijn verb to be')).toEqual({
      zijn: [{
        partOfSpeech: 'verb',
        translations: ['to be'],
      }],
    });

    expect(transformSingle('om prep (a)round')).toEqual({
      om: [{
        partOfSpeech: 'prep',
        translations: ['(a)round'],
      }],
    });

    expect(transformSingle('wel adv ≈ rather')).toEqual({
      wel: [{
        partOfSpeech: 'adv',
        translations: ['≈ rather'],
      }],
    });

    expect(transformSingle('heer noun, de(m) gentleman')).toEqual({
      heer: [{
        partOfSpeech: 'noun',
        article: 'de(m)',
        translations: ['gentleman'],
      }],
    });

    expect(transformSingle('kleren noun, pl clothes')).toEqual({
      kleren: [{
        partOfSpeech: 'noun',
        translations: ['clothes'],
      }],
    });
  });

  test('multiple words', () => {
    expect(transformSingle('zijn, z\'n pron his')).toEqual({
      'zijn, z\'n': [{
        partOfSpeech: 'pron',
        translations: ['his'],
      }],
    });
  });

  test('multiple translations', () => {
    expect(transformSingle('moeten verb to have to, must')).toEqual({
      moeten: [{
        partOfSpeech: 'verb',
        translations: ['to have to'],
      }, {
        partOfSpeech: 'verb',
        translations: ['must'],
      }],
    });

    expect(transformSingle('zich pron herself, himself, itself, themselves')).toEqual({
      zich: [{
        partOfSpeech: 'pron',
        translations: ['herself'],
      }, {
        partOfSpeech: 'pron',
        translations: ['himself'],
      }, {
        partOfSpeech: 'pron',
        translations: ['itself'],
      }, {
        partOfSpeech: 'pron',
        translations: ['themselves'],
      }],
    });
  });

  test('letter separators', () => {
    expect(transformSingle('verbinden verb a) to link b) to bandage')).toEqual({
      verbinden: [{
        partOfSpeech: 'verb',
        translations: ['to link'],
      }, {
        partOfSpeech: 'verb',
        translations: ['to bandage'],
      }],
    });
    expect(transformSingle('punt noun, de(m) a) full stop b) item c) point')).toEqual({
      punt: [{
        partOfSpeech: 'noun',
        article: 'de(m)',
        translations: ['full stop'],
      }, {
        partOfSpeech: 'noun',
        article: 'de(m)',
        translations: ['item'],
      }, {
        partOfSpeech: 'noun',
        article: 'de(m)',
        translations: ['point'],
      }],
    });
  });
});

