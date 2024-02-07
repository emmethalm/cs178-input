export const getHourType = (rawHour: number) => {
  const hour = rawHour % 24;
  if (9 <= hour && hour <= 17) {
    return 'working-hours';
  }
  if ((7 <= hour && hour < 9) || (17 < hour && hour < 23)) {
    return 'waking-hours';
  }
  return 'sleeping-hours';
};

export const displayHour = (rawHour: number) => {
  const hour = rawHour % 24;
  if (hour < 12) {
    return `${hour}:00 AM`;
  }
  return `${hour % 12 || 12}:00 PM`;
};

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const HOURS = Array.from({ length: 24 }, (_, i) => i + 8);
