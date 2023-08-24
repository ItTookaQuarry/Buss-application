import { dates } from "./date";
export function WhatDayisToday(date) {
  const getdate = date.getDay();
  const full = date.toISOString().split("T")[0];
  if (getdate >= 1 && getdate <= 5 && !dates.includes(full)) {
    return ["Robocze", "robocze"];
  }

  if (getdate === 6 && !dates.includes(full)) {
    return ["Soboty", "Soboty"];
  }
  if (getdate === 0) {
    return ["Niedziele", "niedziele"];
  }
  if (dates.includes(full)) {
    return ["Święta", "święta"];
  }
}

export function changetimetominutes(time) {
  const timetoArray = time.split(":");
  let hourstominutes = time[0] === "0" ? time[1] * 1 * 60 : timetoArray[0] * 60;
  let minutestominutes = time[3] === "0" ? time[4] * 1 : timetoArray[1] * 1;

  if (time[0] === 0 && time[1] === 0) {
    hourstominutes = 0;
  }

  if (time[1] === [0] && time[2] === 0) {
    minutestominutes = 0;
  }

  return hourstominutes + minutestominutes;
}

export function whattimeisit() {
  const now = new Date();

  const minutes =
   `${now.getMinutes()}`.length === 2 ? now.getMinutes() : `0${now.getMinutes()}`;

  const hours =
  `${now.getHours()}`.length === 2 ? now.getHours() : `0${now.getHours()}`;


    return `${hours}:${minutes}`

}









export function DepartureTime(time) {
  let hours = 0;
  let minutes = time;
  if (time >= 60) {
    hours = (time - (time % 60)) / 60;
    minutes = time % 60;
  }

  return [hours, minutes];
}
