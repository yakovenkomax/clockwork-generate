export type Translation = {
  partOfSpeech: string;
  article?: string;
  translations: string[];
}

export type Output = {
  [word: string]: Translation[];
};
