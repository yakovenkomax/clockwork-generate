import { Output } from 'types';
import { getPartOfSpeech } from 'transform/getPartOfSpeech';

export const transformSingle = (line: string): Output | undefined => {
  const posWithArticle = getPartOfSpeech(line);

  if (!posWithArticle) {
    console.log('No part of speech found in line:', line);

    return;
  }

  const posStart = line.indexOf(` ${posWithArticle} `);
  const posEnd = posStart + posWithArticle.length + 2;

  const words = line.slice(0, posStart).split(' ');
  const wordKey = words.join(' ').trim();
  const [partOfSpeech, article] = posWithArticle.split(', ');
  const hasLetterSeparators = line.includes(' a)');
  const separator = hasLetterSeparators ? /\w\)\s/ : ', ';
  const translationEntries = line.slice(posEnd).split(separator).filter(Boolean);
  const translations = translationEntries.map(line => ({
    partOfSpeech,
    ...(article && article !== 'pl' && { article }),
    translations: [line.trim()],
  }));

  return {
    [wordKey]: translations,
  };
};
