export function algoToMessage(algo: string): string {
  const [interval, intervalCount, duration, durationCount] = algo.split('|');
  const expectedValues = {
    D: 'Day',
    W: 'Week',
    M: 'Month',
    Y: 'Year',
  };

  const intervalNum = Number(intervalCount);
  const durationNum = Number(durationCount);

  if (!expectedValues[interval] || !expectedValues[duration]) return '';
  if (isNaN(intervalNum) || isNaN(durationNum)) return '';

  return `Every ${intervalNum} ${expectedValues[interval]}${
    intervalNum > 1 ? 's' : ''
  } of ${durationNum} ${expectedValues[duration]}${durationNum > 1 ? 's' : ''}`;
}
