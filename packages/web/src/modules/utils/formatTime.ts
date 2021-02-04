import * as timeago from "timeago.js";

export const formatTime = (val: string): string => {
  if (!val) {
    return "-";
  }

  const newVal = parseInt(val) - new Date().getTimezoneOffset() * 60 * 1000;

  return timeago.format(newVal);
};
