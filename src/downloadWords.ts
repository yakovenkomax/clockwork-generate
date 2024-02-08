import { readJson } from 'utils/readJson';
import { writeJson } from 'utils/writeJson';

const WORDS_FILE_PATH = 'data/words.json';

export const downloadWords = async (): Promise<string[]> => {
  try {
    const words = readJson(WORDS_FILE_PATH);

    return words;
  } catch (e) {
    const wordsFile = await fetch('https://raw.githubusercontent.com/oprogramador/most-common-words-by-language/master/src/resources/dutch.txt');
    const words = (await wordsFile.text()).split('\n');

    writeJson(WORDS_FILE_PATH, words.slice(0, 3000));

    return words;
  }
};
