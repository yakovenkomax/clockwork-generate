import { Translation } from 'types/files.type';
import { removeWord } from 'cleanTranslation/removeWord';
import { removeUppercase } from 'cleanTranslation/removeUppercase';
import { trimWhitespace } from 'cleanTranslation/trimWhitespace';

export const cleanTranslation = (word: string, translation: Translation) => {
  let cleanedTranslation = removeUppercase(word, translation);

  cleanedTranslation = trimWhitespace(cleanedTranslation);

  // Remove the main translation from all frequencies to avoid duplication
  cleanedTranslation = removeWord(cleanedTranslation, translation.main);

  // Repeat without the 'to ' in verbs
  cleanedTranslation = removeWord(cleanedTranslation, translation.main.replace('to ', ''));

  return cleanedTranslation;
};
