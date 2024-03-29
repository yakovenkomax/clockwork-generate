import { TranslationResponse } from 'types/network.type';

export const loadTranslation = async (word: string) => {
  try {
    // Wait before making a request to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const res = await fetch(`http://0.0.0.0:8999/api?text=${word}&from=nl&to=en`);
    const data: TranslationResponse = await res.json();

    if ('error' in data) {
      console.error(`Unsuccessful request for the word "${word}" translation.`);

      return;
    }

    return data;
  } catch (error) {
    console.error(`An error occurred during translation of the word "${word}": `, error);

    return;
  }
};
