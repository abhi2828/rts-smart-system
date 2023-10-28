export function getDateDiffInDays(limitDate: number) {
  const date1 = new Date(limitDate);
  const date2 = new Date(Date.now());

  const differenceInTime = date1.getTime() - date2.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.floor(differenceInDays);
}

export function formatDate(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}
