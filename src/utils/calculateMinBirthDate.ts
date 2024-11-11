export const calculateMinBirthDate = (maxAgeYears: number): string => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - maxAgeYears);
  return today.toISOString().split('T')[0];
};
