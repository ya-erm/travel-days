import type { MessageFormatter } from '$lib/translate';
import type { Dayjs } from 'dayjs';

/** Возвращает дату в формате "8 марта, пн" если это в текущем году, иначе "8 марта 2023" */
export function formatDate(date: Dayjs) {
  if (date.year() === new Date().getFullYear()) {
    return date.format('D MMMM, dd');
  }
  return date.format('D MMMM YYYY');
}

/** Форматирование интервала времени в формате "2 ч 30 мин" */
export function formatDuration(totalMinutes: number, translate: MessageFormatter) {
  // const days = Math.floor(totalMinutes / 24 / 60);
  // const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const duration = [
    hours > 0 ? translate('common.time.h', { values: { hours } }) : null,
    minutes > 0 ? translate('common.time.m', { values: { minutes } }) : null,
  ]
    .filter(Boolean)
    .join(' ');

  return duration;
}
