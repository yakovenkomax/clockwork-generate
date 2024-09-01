import { Output, Translation } from 'types';
import { transformSingle } from 'transform/transformSingle';
import { transformMultiple } from 'transform/transformMultiple';

const unifyTranslations = (input: Output) => {
  return Object.keys(input).reduce((output, word) => {
    const translations = input[word];

    const combinedTranslations: Translation[] = [];

    translations.forEach((current) => {
      const matchingTranslation = combinedTranslations.find(
        (translation) =>
          translation.partOfSpeech === current.partOfSpeech &&
          translation.article === current.article,
      );

      if (matchingTranslation) {
        matchingTranslation.translations.push(...current.translations);
      } else {
        combinedTranslations.push(current);
      }
    });

    output[word] = combinedTranslations;

    return output;
  }, {} as Output);
};

export const transform = (input: string) => {
  let output: Output = {};
  const inputLines = input.trim().split('\n');

  inputLines.forEach(line => {
    const isMultiplePos = line.includes(' 1)');
    let transformedLine: Output | undefined;

    if (isMultiplePos) {
      transformedLine = transformMultiple(line);
    } else {
      transformedLine = transformSingle(line);
    }

    if (!transformedLine) {
      console.log('Transformation is empty for line:', line);

      return;
    }

    const wordKey = Object.keys(transformedLine)[0];

    if (output[wordKey]) {
      output[wordKey].push(...transformedLine[wordKey]);

      return;
    }

    output = {
      ...output,
      ...transformedLine,
    };
  });

  return unifyTranslations(output);
};
