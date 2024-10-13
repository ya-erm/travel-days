import type { Dayjs } from 'dayjs';

/** Возвращает дату в формате "8 марта, пн" если это в текущем году, иначе "8 марта 2023, пн" */
export function formatDate(date: Dayjs) {
  if (date.year() === new Date().getFullYear()) {
    return date.format('D MMMM, dd');
  }
  return date.format('D MMMM YYYY, dd');
}
