/**
 * Gets the time zone offset for a given time zone name.
 * @param timeZone The time zone to get the offset for, e.g. 'Europe/London'.
 * @param format The format of the offset. Defaults to 'shortOffset'.
 * @returns The time zone offset in the specified format: '+HH:mm' or '+h'.
 */
export function getTimeZoneOffset(timeZone: string, format: 'shortOffset' | 'longOffset' = 'shortOffset') {
  try {
    const date = Intl.DateTimeFormat([], { timeZone, timeZoneName: format });
    return date.format(new Date()).split(' ')[1].slice(3) || '+00:00';
  } catch (e) {
    console.warn(`Failed to get time zone offset for '${timeZone}'`, e);
    return undefined;
  }
}

/**
 * Converts a long time zone offset to a short time zone offset.
 * @param longTimezoneOffset The long time zone offset to convert, e.g. '+02:00' or '-05:00'.
 * @returns The short time zone offset, e.g. '+2' or '-5'.
 * @note This function does not handle time zone offsets with minutes other than 00, e.g. +02:30.
 */
export function toShortTimezoneOffset(longTimezoneOffset: string | undefined) {
  return longTimezoneOffset?.replace(/([+-])0?(\d+):00/, '$1$2');
}

/**
 * Converts time zone offset in minutes to a long time zone offset, e.g. '+02:00' or '-05:00'.
 * @param minutes The time zone offset in minutes.
 * @returns +HH:mm or -HH:mm
 */
export function minutesToOffset(minutes: number) {
  const sign = minutes < 0 ? '-' : '+';
  const m = Math.abs(minutes) % 60;
  const h = (Math.abs(minutes) - m) / 60;
  return `${sign}${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;
}
