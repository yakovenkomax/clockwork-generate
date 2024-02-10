import * as fs from 'fs';
import { downloadWords } from 'downloadWords';
import { loadTranslation } from 'loadTranslation';
import { restructureTranslation } from 'restructureTranslation';
import { cleanTranslation } from 'cleanTranslation/cleanTranslation';
import { limitTranslation } from 'limitTranslation/limitTranslation';
import { writeJson } from 'utils/writeJson';
import { readJson } from 'utils/readJson';
import { Translations } from 'types/files.type';

const SAVE_EVERY = 10;

try {
  fs.readdirSync('data');
} catch (e) {
  fs.mkdirSync('data');
}

const words = await downloadWords();

let existingTranslations: Translations = readJson('data/translations.json');
let progressCount = Object.keys(existingTranslations).length;
let translationsBatch: Translations = {};

const saveTranslationsBatch = () => {
  existingTranslations = readJson('data/translations.json');

  writeJson('data/translations.json', {
    ...existingTranslations,
    ...translationsBatch,
  });

  console.log('Saved current batch to file.');

  translationsBatch = {};
};

for await (const word of words) {
  if (word in existingTranslations) {
    continue;
  }

  const translationData = await loadTranslation(word);

  if (!translationData) {
    // Ignore unsuccessful translation requests
    continue;
  }

  let translation = restructureTranslation(translationData);

  // Remove duplicates, typos, whitespaces, etc.
  translation = cleanTranslation(word, translation);

  // Crop the amount of translations
  translation = limitTranslation(translation);

  translationsBatch[word] = translation;
  progressCount++;
  console.log(`${progressCount} / ${words.length}: ${word} - ${translation.main}`);

  if (progressCount % SAVE_EVERY === 0) {
    saveTranslationsBatch();
  }
}

if (Object.keys(translationsBatch).length > 0) {
  saveTranslationsBatch();
}
