import * as dayjs from 'dayjs';

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

export function warrantyDatesGenerator(algorithm: string, dateStart: Date): Array<Date> {
  const dates: Array<Date> = [];
  const [interval, intervalCount, duration, durationCount] = algorithm.split('|');
  const intervalInt = parseInt(intervalCount);
  const durationInt = parseInt(durationCount);

  const shorthand = {
    D: 'd',
    W: 'w',
    M: 'M',
    Y: 'y',
  };

  const endDate = dayjs(dateStart).add(durationInt, shorthand[duration]);
  let recurringDate = dayjs(dateStart).add(intervalInt, shorthand[interval]);

  while (endDate.toDate() >= recurringDate.toDate()) {
    dates.push(recurringDate.toDate());
    recurringDate = recurringDate.add(intervalInt, shorthand[interval]);
  }

  return dates;
}
