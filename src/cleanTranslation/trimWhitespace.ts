import { Translation, TranslationsByFrequency, TranslationsByPartOfSpeech } from 'types/files.type';
import { Frequency, PartOfSpeech } from 'types/enums.type';

const trimFrequency = (translationsByFrequency: TranslationsByFrequency) => {
  const frequencyKeys = Object.keys(translationsByFrequency) as Frequency[];

  return frequencyKeys.reduce((acc, frequency) => {
    acc[frequency] = translationsByFrequency[frequency]?.map(translation => translation.trim());

    return acc;
  }, {} as TranslationsByFrequency);
};

const trimPartsOfSpeech = (translationsByPartOfSpeech: TranslationsByPartOfSpeech) => {
  const partOfSpeechKeys = Object.keys(translationsByPartOfSpeech) as PartOfSpeech[];

  return partOfSpeechKeys.reduce((acc, partOfSpeech) => {
    const translationByFrequency = translationsByPartOfSpeech[partOfSpeech];

    if (!translationByFrequency) {
      return acc;
    }

    acc[partOfSpeech] = trimFrequency(translationByFrequency);

    return acc;
  }, {} as TranslationsByPartOfSpeech);
};

export const trimWhitespace = (translation: Translation) => {
  if (!translation.partsOfSpeech) {
    return {
      main: translation.main.trim(),
    };
  }

  return {
    main: translation.main.trim(),
    partsOfSpeech: trimPartsOfSpeech(translation.partsOfSpeech),
  };
};
