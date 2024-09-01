import { Output } from 'types';
import { PARTS_OF_SPEECH } from 'transform/getPartOfSpeech';

export const transformMultiple = (line: string): Output | undefined => {
  const separatorIndex = line.indexOf(' 1)');
  const words = line.slice(0, separatorIndex).split(' ');
  const wordKey = words.join(' ').trim();

  const posAndTranslationsEntries = line.slice(separatorIndex).split(/\s[0-9]\)\s/).filter(Boolean);
  const step = posAndTranslationsEntries.length / 2;
  const translations = [];

  for (let i = 0; i < posAndTranslationsEntries.length / 2; i += 1) {
    const posWithArticle = posAndTranslationsEntries[i];
    const [partOfSpeech, article] = posWithArticle.split(', ');
    const translation = posAndTranslationsEntries[i + step];

    if (!PARTS_OF_SPEECH.includes(posWithArticle)) {
      console.log('Unknown part of speech in line:', line);

      return;
    }

    const translationEntry = {
      partOfSpeech,
      ...(article && { article }),
      translations: [translation.trim()],
    };
    translations.push(translationEntry);
  }

  return {
    [wordKey]: translations,
  };
};
