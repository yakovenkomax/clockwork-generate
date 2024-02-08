import { Translation, TranslationsByFrequency, TranslationsByPartOfSpeech } from 'types/files.type';
import { Frequency, PartOfSpeech } from 'types/enums.type';

const PRONOUNS = ['I'];
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const NAMES_OF_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const EXCEPTIONS = [...PRONOUNS, ...DAYS_OF_WEEK, ...NAMES_OF_MONTHS];

const lowerFrequency = (translationsByFrequency: TranslationsByFrequency) => {
  const frequencyKeys = Object.keys(translationsByFrequency) as Frequency[];

  return frequencyKeys.reduce((acc, frequency) => {
    acc[frequency] = translationsByFrequency[frequency]?.map(translation => {
      if (EXCEPTIONS.includes(translation)) {
        return translation;
      }

      return translation.toLowerCase();
    });

    return acc;
  }, {} as TranslationsByFrequency);
};

const lowerPartsOfSpeech = (translationsByPartOfSpeech: TranslationsByPartOfSpeech) => {
  const partOfSpeechKeys = Object.keys(translationsByPartOfSpeech) as PartOfSpeech[];

  return partOfSpeechKeys.reduce((acc, partOfSpeech) => {
    const translationByFrequency = translationsByPartOfSpeech[partOfSpeech];

    if (!translationByFrequency) {
      return acc;
    }

    acc[partOfSpeech] = lowerFrequency(translationByFrequency);

    return acc;
  }, {} as TranslationsByPartOfSpeech);
};

export const removeUppercase = (word: string, translation: Translation) => {
  // Original word also starts with a capital letter
  if (word.charAt(0) === word.charAt(0).toUpperCase()) {
    return translation;
  }

  const lowerMain = EXCEPTIONS.includes(translation.main) ? translation.main : translation.main.toLowerCase();

  if (!translation.partsOfSpeech) {
    return {
      main: lowerMain,
    };
  }

  return {
    main: lowerMain,
    partsOfSpeech: lowerPartsOfSpeech(translation.partsOfSpeech),
  };
};
