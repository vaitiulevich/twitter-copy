export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const debounced = (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  return debounced;
};
