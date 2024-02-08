import { Translation, TranslationsByFrequency, TranslationsByPartOfSpeech } from 'types/files.type';
import { PartOfSpeech } from 'types/enums.type';
import { TranslationData } from 'types/network.type';

export const restructureTranslation = (data: TranslationData): Translation => {
  const { result, translations } = data;

  if (!translations) {
    return {
      main: result,
    };
  }

  const partsOfSpeech = Object.keys(translations) as PartOfSpeech[];
  const partOfSpeechTranslations = partsOfSpeech.reduce((acc, partOfSpeech) => {
    const currentPartOfSpeechTranslations = translations[partOfSpeech];

    if (!currentPartOfSpeechTranslations) {
      return acc;
    }

    const usedFrequencies = [...new Set(currentPartOfSpeechTranslations.map(item => item.frequency))];

    acc[partOfSpeech] = usedFrequencies.reduce((acc, frequency) => {
      acc[frequency] = currentPartOfSpeechTranslations.filter(item => item.frequency === frequency).map(item => item.translation);

      return acc;
    }, {} as TranslationsByFrequency);

    return acc;
  }, {} as TranslationsByPartOfSpeech);

  return {
    main: result,
    ...(Object.keys(partOfSpeechTranslations).length ? { partsOfSpeech: partOfSpeechTranslations } : {}),
  };
};
