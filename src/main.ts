import * as fs from 'fs';
import { downloadWords } from 'downloadWords';
import { loadTranslation } from 'loadTranslation';
import { restructureTranslation } from 'restructureTranslation';
import { cleanTranslation } from 'cleanTranslation/cleanTranslation';
import { limitTranslation } from 'limitTranslation/limitTranslation';
import { writeJson } from 'utils/writeJson';
import { readJson } from 'utils/readJson';
import { Translation, Translations } from 'types/files.type';

const TRANSLATIONS_FILE_PATH = 'data/translations.json';

try {
  fs.readdirSync('data');
} catch (e) {
  fs.mkdirSync('data');
}

let translations: Translations;

try {
  translations = readJson(TRANSLATIONS_FILE_PATH);
} catch (e) {
  translations = {};
}

const words = await downloadWords();

let progressCount = 0;
let translationsBatch: Translations = {};

// Save in batches to reduce the amount of write operations
const saveToTranslationsBatch = (word: string, translation: Translation) => {
  translationsBatch[word] = translation;

  progressCount++;

  console.log(`${progressCount} / ${words.length}: ${word} - ${translation.main}`);

  if (progressCount % 10 === 0) {
    translations = readJson(TRANSLATIONS_FILE_PATH);
    writeJson(TRANSLATIONS_FILE_PATH, {
      ...translations,
      ...translationsBatch,
    });
    console.log('Saved current batch to file.');

    translationsBatch = {};
  }
};

for await (const word of words) {
  if (word in translations) {
    continue;
  }

  const translationData = await loadTranslation(word);

  if (!translationData) {
    continue;
  }

  let translation = restructureTranslation(translationData);

  // Remove duplicates, typos, whitespaces, etc.
  translation = cleanTranslation(word, translation);

  // Crop the amount of translations
  translation = limitTranslation(translation);

  saveToTranslationsBatch(word, translation);
}

writeJson(TRANSLATIONS_FILE_PATH, {
  ...translations,
  ...translationsBatch,
});
