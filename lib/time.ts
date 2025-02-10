import moment from "moment-timezone";

// Set default timezone secara global
const DEFAULT_TIMEZONE = "Asia/Jakarta";

export const getCurrentTime = () => {
  return moment().tz(DEFAULT_TIMEZONE);
};

export const formatDateTime = (date: string, format = "YYYY-MM-DD HH:mm:ss") => {
  return moment.tz(date, DEFAULT_TIMEZONE).format(format);
};

export const toUTC = (date: string, format = "YYYY-MM-DD HH:mm:ss") => {
  return moment.tz(date, DEFAULT_TIMEZONE).utc().format(format);
};
