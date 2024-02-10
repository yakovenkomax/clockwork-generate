import { readJson } from 'utils/readJson';
import { writeJson } from 'utils/writeJson';

const WORDS_FILE_PATH = 'data/words.json';
const WORD_COUNT = 3000;

export const downloadWords = async (): Promise<string[]> => {
  const existingWords = readJson(WORDS_FILE_PATH);

  if (Object.keys(existingWords).length > 0) {
    return existingWords;
  }

  const wordsData = await fetch('https://raw.githubusercontent.com/oprogramador/most-common-words-by-language/master/src/resources/dutch.txt');
  const words = (await wordsData.text()).split('\n');

  const cleanWords = words.filter(word => {
    return word.length > 1 || word === 'u';
  });

  const limitedWords = cleanWords.slice(0, WORD_COUNT);

  writeJson(WORDS_FILE_PATH, limitedWords);

  return words;
};
