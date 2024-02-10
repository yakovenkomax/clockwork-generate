import { Frequency, PartOfSpeech } from 'types/enums.type';

export type TranslationResponse = LimitError | TranslationError | TranslationData;

type LimitError = {
  error: number;
  message: string;
}

type TranslationError = {
  statusCode: 500;
  error: string;
  message: string;
}

export type TranslationData = {
  result: string;
  pronunciation: string;
  from: {
    pronunciation?: string;
    suggestions?: Array<{
      text: string;
      translation: string;
    }>;
  }
  translations?: {
    [key in PartOfSpeech]?: Array<{
      translation: string;
      reversedTranslations: Array<string>;
      frequency: Frequency;
    }>;
  }
  definitions?: {
    [key in PartOfSpeech]: Array<{
      definition: string;
      example: string;
    }>
  }
}
