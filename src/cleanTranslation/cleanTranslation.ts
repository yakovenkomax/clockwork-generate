import { Translation } from 'types/files.type';
import { removeWord } from 'cleanTranslation/removeWord';
import { removeUppercase } from 'cleanTranslation/removeUppercase';
import { trimWhitespace } from 'cleanTranslation/trimWhitespace';

export const cleanTranslation = (word: string, translation: Translation) => {
  // Remove the main translation from all frequencies to avoid duplication
  let cleanedTranslation = removeWord(translation, translation.main);

  // Repeat without the 'to ' in verbs
  cleanedTranslation = removeWord(cleanedTranslation, translation.main.replace('to ', ''));

  cleanedTranslation = removeUppercase(word, cleanedTranslation);

  cleanedTranslation = trimWhitespace(cleanedTranslation);

  return cleanedTranslation;
};
