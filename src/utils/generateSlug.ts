export const generateSlug = (name: string, userId: string): string => {
  const lowerCaseName = name.toLowerCase();
  const slugifiedName = lowerCaseName
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .substring(0, 30);
  const uniqueSlug = `@${slugifiedName}_${userId.slice(-4)}`;

  return uniqueSlug;
};
