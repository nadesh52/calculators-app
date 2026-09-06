export const findBest = (items: any[]) => {
  if (!items || items.length === 0) return null;
  return items.reduce((best: any, current: any) =>
    (current?.average || 0) > (best?.average || 0) ? current : best,
  );
};
