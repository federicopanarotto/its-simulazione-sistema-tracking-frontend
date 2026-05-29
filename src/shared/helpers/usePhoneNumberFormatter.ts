import { useState, useCallback } from 'react';

interface UsePhoneNumberFormatProps {
  initialValue?: string;
  maxDigits?: number;
  spaceAfter?: number;
}

export const usePhoneNumberFormat = ({ 
  initialValue = '', 
  maxDigits = 10,
  spaceAfter = 3 
}: UsePhoneNumberFormatProps = {}) => {
  const [value, setValue] = useState(initialValue);

  const formatPhoneNumber = useCallback((inputValue: string) => {
    // Rimuovi tutto ciò che non è un numero
    const numbers = inputValue.replace(/\D/g, '');
    
    // Limita al numero massimo di cifre
    const limitedNumbers = numbers.slice(0, maxDigits);
    
    // Se non ci sono abbastanza numeri per lo spazio, ritorna così com'è
    if (limitedNumbers.length <= spaceAfter) {
      return limitedNumbers;
    }
    
    // Formatta con lo spazio
    return `${limitedNumbers.slice(0, spaceAfter)} ${limitedNumbers.slice(spaceAfter)}`;
  }, [maxDigits, spaceAfter]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setValue(formattedValue);
    return formattedValue;
  }, [formatPhoneNumber]);

  const getUnformattedValue = useCallback(() => {
    return value.replace(/\D/g, '');
  }, [value]);

  return {
    value,
    formattedValue: value,
    unformattedValue: getUnformattedValue(),
    handleChange,
    formatPhoneNumber,
    setValue
  };
};