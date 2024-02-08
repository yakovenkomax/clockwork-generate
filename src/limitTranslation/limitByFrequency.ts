import { TranslationsByFrequency } from 'types/files.type';
import { Frequency } from 'types/enums.type';

type LimitByFrequencyParams = {
  translationsByFrequency: TranslationsByFrequency,
  maxPerFrequency: {
    [key in Frequency]?: number
  }
}

export const limitByFrequency = (params: LimitByFrequencyParams) => {
  const { translationsByFrequency, maxPerFrequency } = params;
  const frequencyKeys = Object.keys(translationsByFrequency) as Array<Frequency>;

  return frequencyKeys.reduce((acc, frequency) => {
    const translationsForFrequency = translationsByFrequency[frequency];
    const limitPerFrequency = maxPerFrequency[frequency];

    if (!translationsForFrequency) {
      return acc;
    }

    let limitedTranslations = translationsForFrequency;

    if (typeof limitPerFrequency === 'number') {
      limitedTranslations = translationsForFrequency.slice(0, limitPerFrequency);
    }

    if (limitedTranslations.length > 0) {
      acc[frequency] = limitedTranslations;
    }

    return acc;
  }, {} as TranslationsByFrequency);
};
