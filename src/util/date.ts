export function date(customDate?: Date): string {
  const date: Date = customDate ? new Date(customDate) : new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const formattedDate: string = date.toLocaleDateString(undefined, options);

  return formattedDate;
}
