export const useScientific = () => {
  const SCIENTIFIC_NOTATION_REGEX = /(\d+\.?\d*)e\d*(\+|-)(\d+)/;

  const convertScientificToDecimal = (number: number) => {
    if (!number) return null;

    let parsedValue = parseFloat(number.toString());
    const valueString = parsedValue.toString();

    // Check if the value is in scientific notation
    const scientificNotationMatch = SCIENTIFIC_NOTATION_REGEX.exec(valueString);

    // If the value is not in scientific notation, return it as a string
    if (!scientificNotationMatch) {
      return parsedValue.toString();
    }

    // Extract the base, positive/negative sign, and exponent from the scientific notation value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, base, positiveNegative, exponent] = scientificNotationMatch;

    // If the exponent is positive, add trailing zeros
    if (positiveNegative === '+') {
      let precision = parseInt(exponent);
      let formatted;

      if (base.indexOf('.') !== -1) {
        // If the base contains a decimal point, split it into integer and decimal parts
        const [integerPart, decimalPart] = base.split('.');

        // Calculate the number of trailing zeros needed
        precision -= decimalPart.length + integerPart.length;

        // Concatenate the integer part, decimal part, and trailing zeros
        formatted = integerPart + decimalPart + '0'.repeat(precision);
      } else {
        // If the base does not contain a decimal point, add trailing zeros to the end
        formatted = base + '0'.repeat(precision);
      }

      return formatted;
    } else {
      // If the exponent is negative, round the value to the appropriate number of decimal places
      let precision = base.length + parseInt(exponent) - 1;

      // If the base contains a decimal point, subtract 1 from the precision
      if (base.indexOf('.') !== -1) {
        precision--;
      }

      const formatted = parsedValue.toFixed(precision);

      return formatted;
    }
  };

  const parseScientific = (number: number, roundingDecimals?: number) => {
    if (!number) return null;

    let formatted = convertScientificToDecimal(number);

    if (roundingDecimals) {
      const roundedNumber =
        Math.round(Number(formatted) * Math.pow(10, roundingDecimals)) /
        Math.pow(10, roundingDecimals);

      return convertScientificToDecimal(roundedNumber)?.toString();
    }

    return formatted;
  };

  return { parseScientific };
};
