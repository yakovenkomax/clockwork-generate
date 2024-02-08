import { Translation } from 'types/files.type';
import { removeWord } from 'cleanTranslation/removeWord';

export const cleanTranslation = (translation: Translation) => {
  // Remove the main translation from all frequencies to avoid duplication
  let cleanedTranslation = removeWord(translation, translation.main);

  // Repeat without the 'to ' in verbs
  cleanedTranslation = removeWord(cleanedTranslation, translation.main.replace('to ', ''));

  // TODO: remove uppercase
  // TODO: trim whitespace

  return cleanedTranslation;
};
