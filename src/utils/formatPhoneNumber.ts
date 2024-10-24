export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  let formatted = '';

  if (cleaned.length > 0) {
    formatted += `(${cleaned.substring(0, 3)}`;
  }
  if (cleaned.length > 3) {
    formatted += `) ${cleaned.substring(3, 6)}`;
  }
  if (cleaned.length > 6) {
    formatted += `-${cleaned.substring(6, 8)}`;
  }
  if (cleaned.length > 8) {
    formatted += `-${cleaned.substring(8, 10)}`;
  }

  return formatted;
};
