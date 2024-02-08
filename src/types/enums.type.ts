export enum Frequency {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
}

export enum PartOfSpeech {
  ARTICLE = 'article',
  NOUN = 'noun',
  ABBREVIATION = 'abbreviation',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  PREPOSITION = 'preposition',
  ADVERB = 'adverb',
  CONJUNCTION = 'conjunction',
  PRONOUN = 'pronoun',
  AUXILIARY_VERB = 'auxiliary verb'
}

export const FrequencyWeight = {
  [Frequency.COMMON]: 3,
  [Frequency.UNCOMMON]: 2,
  [Frequency.RARE]: 1,
};
