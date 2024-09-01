export const PARTS_OF_SPEECH = [
  'adj',
  'adv',
  'art',
  'conj',
  'noun, de',
  'noun, de(m)',
  'noun, de(f)',
  'noun, het',
  'noun, de/het',
  'noun, de(m)/het',
  'noun, de(f)/het',
  'noun, pl',
  'num',
  'interj',
  'prep',
  'pron',
  'verb',
];

export const getPartOfSpeech = (line: string): string | undefined => {
  return PARTS_OF_SPEECH.find(partOfSpeech => line.includes(` ${partOfSpeech} `));
};
