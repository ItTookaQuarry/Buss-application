"use server";
import { WhatDayisToday } from "./whatdate";
import { changetimetominutes } from "./whatdate";
import { buses } from "./buses";
import { data } from "autoprefixer";
import { bUsstops } from "./BUSSTOPS";
import { DataArray } from "@mui/icons-material";

export async function fetchbuses(start, stop) {
  const uniquebusstops = Array.from(new Set(bUsstops));

  const Początek = uniquebusstops[start];
  const Koniec = uniquebusstops[stop];
  const fetchPromises = buses.map((url) =>
    fetch(`http://localhost:3000/api/${url}`)
  );
  const responses = await Promise.all(fetchPromises);

  const dataArray = await Promise.all(
    responses.map(async (response) => {
      const data = await response.json();

      return data;
    })
  );

  let tab = [];
  const mapped = dataArray.map((api, indeks) => {
    let INDEKS = indeks;
    let value = -1;
    return api[0].map((each, i) => {
      const indekss = i;
      return each.map((data, indeks) => {
        const dire = data.dire;
        const stops = data?.stops?.map((each, i) => {
          value = value + 1;
          const ii = i;
          if (each !== null) {
            return { stop: each.replace(/\n/g, " "), val: value };
          }
          return { stop: each, val: value };
        });

        return { directions: dire, stops: stops, indeks: INDEKS };
      });
    });
  });

  const filtred = mapped.map((each) => {
    for (let i = 0; i < each.length; i++) {
      const filter = each[i]?.filter((each, indeks) => {
        const stops = each.stops;
        const hasDesiredStopB = stops?.some((obj) =>
          obj?.stop?.includes(Początek)
        );
        const hasDesiredStopE = stops?.some((obj) =>
          obj?.stop?.includes(Koniec)
        );

        return hasDesiredStopB === true && hasDesiredStopE === true;
      });
      if (filter.length > 0) {
        const filtr = filter[0].stops.filter((each) => {
          return each.stop === Początek || each.stop === Koniec;
        });

        const filtredagain = filtr.filter((each, indeks) => {
          return each?.stop === Początek && filtr[indeks + 1]?.stop === Koniec;
        });

        if (filtredagain.length > 0) {
          tab.push(
            filtredagain.map((each) => {
              return { ...each, INDEKS: filter[0].indeks };
            })
          );
        }
      }
    }

    return null;
  });

  let Filtredbuses = [];
  let tabtoreturn = [];
  let data = tab.map((each) => {
    Filtredbuses.push(buses[each[0].INDEKS]);
    tabtoreturn.push([each[0].val, each.INDEKS]);

    return dataArray[each[0].INDEKS];
  });

  return [data, Filtredbuses, tabtoreturn];
}
