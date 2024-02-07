export type BlockId = `day-${number}-hour-${number}`;

export const getBlockId = (day: number, hour: number): BlockId => `day-${day}-hour-${hour}`

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

export const TIME_ZONES = ['GMT', 'EST', 'CST', 'MST', 'PST'] as const;

export type TimeZone = typeof TIME_ZONES[number];

export const OFFSETS: Record<TimeZone, number> = {
  GMT: 0,
  EST: -5,
  CST: -6,
  MST: -7,
  PST: -8,
};

export const maxAttendees = 10;