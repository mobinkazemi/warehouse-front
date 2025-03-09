import moment from "jalali-moment";

export const timestampToJalali = (timestamp: number) => {
  return moment(timestamp).locale("fa").format("YYYY/MM/DD-HH:mm");
};
