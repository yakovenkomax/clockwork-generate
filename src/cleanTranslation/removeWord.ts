import { Translation, TranslationsByFrequency, TranslationsByPartOfSpeech } from 'types/files.type';
import { Frequency, PartOfSpeech } from 'types/enums.type';

const cleanPartOfSpeech = (translationsByFrequency: TranslationsByFrequency, wordToRemove: string) => {
  const frequencyKeys = Object.keys(translationsByFrequency) as Frequency[];

  return frequencyKeys.reduce((acc, frequency) => {
    const translationsForFrequency = translationsByFrequency[frequency];
    const cleanedFrequency = translationsForFrequency?.filter(translation => translation !== wordToRemove);

    if (cleanedFrequency?.length === 0) {
      return acc;
    }

    return {
      ...acc,
      [frequency]: cleanedFrequency,
    };
  }, {} as TranslationsByFrequency);
};

export const removeWord = (translation: Translation, wordToRemove: string) => {
  if (!translation.partsOfSpeech) {
    return translation;
  }

  const partsOfSpeech = Object.keys(translation.partsOfSpeech) as PartOfSpeech[];

  const cleanedPartsOfSpeech = partsOfSpeech.reduce((acc, partOfSpeech) => {
    const translationsByFrequency = translation.partsOfSpeech?.[partOfSpeech];

    if (!translationsByFrequency) {
      return acc;
    }

    const cleanedFrequencies = cleanPartOfSpeech(translationsByFrequency, wordToRemove);

    if (!Object.keys(cleanedFrequencies).length) {
      return acc;
    }

    return {
      ...acc,
      [partOfSpeech]: cleanedFrequencies,
    };
  }, {} as TranslationsByPartOfSpeech);

  if (!Object.keys(cleanedPartsOfSpeech).length) {
    return {
      main: translation.main,
    };
  }

  return {
    ...translation,
    partsOfSpeech: cleanedPartsOfSpeech,
  };
};
