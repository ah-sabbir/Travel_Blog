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

export const formatShortDate = (rawDate: string) => {
  const date = new Date(rawDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString("vi", options);
};
