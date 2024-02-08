import { limitByFrequency } from 'limitTranslation/limitByFrequency';
import { limitByPartOfSpeech } from 'limitTranslation/limitByPartOfSpeech';
import { Translation, TranslationsByFrequency, TranslationsByPartOfSpeech } from 'types/files.type';
import { PartOfSpeech } from 'types/enums.type';

const MAX_PER_FREQUENCY = {
  common: 3,
  uncommon: 2,
  rare: 0,
};

const MAX_PER_PART_OF_SPEECH = 4;

export const limitTranslation = (translation: Translation) => {
  const partsOfSpeechTranslations = translation.partsOfSpeech;

  if (!partsOfSpeechTranslations) {
    return translation;
  }

  const partsOfSpeech = Object.keys(partsOfSpeechTranslations) as PartOfSpeech[];
  const partsOfSpeechLimitedTranslations = partsOfSpeech.reduce((acc, partOfSpeech) => {
    let translationsByFrequency: TranslationsByFrequency | undefined = { ...partsOfSpeechTranslations[partOfSpeech] };

    if (!translationsByFrequency) {
      return acc;
    }

    // Limit large amount of translations within frequency
    translationsByFrequency = limitByFrequency({ translationsByFrequency, maxPerFrequency: MAX_PER_FREQUENCY });

    // Limit the amount of translations per part of speech
    translationsByFrequency = limitByPartOfSpeech({
      translationsByFrequency,
      maxPerPartOfSpeech: MAX_PER_PART_OF_SPEECH,
    });

    if (!Object.keys(translationsByFrequency).length) {
      return acc;
    }

    return {
      ...acc,
      [partOfSpeech]: translationsByFrequency,
    };
  }, {} as TranslationsByPartOfSpeech);

  if (!Object.keys(partsOfSpeechLimitedTranslations).length) {
    return translation;
  }

  return {
    ...translation,
    partsOfSpeech: partsOfSpeechLimitedTranslations,
  };
};
