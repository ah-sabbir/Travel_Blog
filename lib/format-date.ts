export const formatLongDate = (rawDate: string) => {
  const date = new Date(rawDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("vi", options);
};
