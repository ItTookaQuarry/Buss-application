"use client";

import { WhatDayisToday } from "./whatdate";
import React from "react";
import { changetimetominutes } from "../(components)/whatdate";
import { DepartureTime } from "../(components)/whatdate";
import Image from "next/image";
import pkm from "/public/pkm23.jpg";
import Departure from "../(components)/Departure";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Form from "../(components)/Form";
import { myAction } from "../(components)/action";
import { whattimeisit } from "./whatdate";

export default function ClientResultPage(props) {
  const classtodisplay =
    "inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]";
  const now = new Date();


  const table = props.tab;
  let FiltredTableofdata = [];
  const pagetodisplay = props.pagetodisplay;

  const linktab = props.linktab;

  const [state, setstate] = React.useState(
    (60 - new Date().getSeconds()) * 1000
  );

  const [currHcurrM, setCurrhcurrM] = React.useState(
  whattimeisit()
  );


  React.useEffect(() => {
    setTimeout(() => {
      setstate((60 - new Date().getSeconds()) * 1000);
      setCurrhcurrM(whattimeisit());
    }, state);
  }, [currHcurrM]);

  const daYToday = WhatDayisToday(now);
  const data = props.data;
  const Filtredbuses = props.Filtredbuses;
  console.log(Filtredbuses);
  console.log(data);
  data.map((data, indeks) => {
    const INDEKS = indeks;
    const splited = table[indeks][0];
    return data[1][splited].map((each, i) => {
      const days = each.Days.replace("(", "")
        .replace(")", "")
        .replace(":", "")
        .replace(",", "")
        .split(" ");
      const bull = days.includes(daYToday[0]) || days.includes(daYToday[1]);
      const mapped = each.length.map((hour) => {
        const h = [...hour];

        const toreturn = h.length === 6 ? h.splice(0, 5).join("") : hour;

        return toreturn;
      });

      if (bull) {
        FiltredTableofdata.push({
          data: mapped.filter((each) => {
            return changetimetominutes(each) > changetimetominutes(currHcurrM);
          }),
          BUS: Filtredbuses[INDEKS],
        });
      }
    });
  });

  let tabletodisplaytouser = [];

  for (const el of FiltredTableofdata) {
    el.data.map((each) => {
      tabletodisplaytouser.push({ hour: each, bus: el.BUS });
    });
  }

  tabletodisplaytouser.sort((a, b) => {
    if (a.hour > b.hour) {
      return 1;
    }
    if (a.hour < b.hour) {
      return -1;
    }
    return 0;
  });

  console.log(tabletodisplaytouser);
  const tomapp = [...tabletodisplaytouser]?.splice(pagetodisplay - 1, 5);

  const todisplay = tomapp.map((each,indeks) => {
    const departure = DepartureTime(
      changetimetominutes(each.hour) - changetimetominutes(currHcurrM)
    );


    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            margin: "auto",
          }}
          class={classtodisplay}

          
        >
          {" "}
          <Departure
            hour={each.hour}
            bus={each.bus}
            depzero={departure[0]}
            depone={departure[1]}
          />
        </div>
      </>
    );
  });

  return (
    <div>
      <Image
        src={pkm}
        alt="bus"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr " }}>
        <form
          style={{
            gridColumn: "2/3",
            margin: "auto",
            display: "grid",
            textAlign: "center",
            position: "relative",
            gap:"5%"
          }}
          action={myAction}
        >
          <Form />
        </form>
      </div>
      <br></br>
      {table?.length > 0 && (
        <div
          className="resultsgrid"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "3%",
          }}
        >
          {table !== 0 && pagetodisplay > 1 && (
            <Link
              href={`${linktab}&todisplay=${pagetodisplay - 5}`}
              style={{ margin: "auto" }}
            >
              {" "}
              <button type="submit" class={classtodisplay}>
                <FontAwesomeIcon icon={faArrowUp} />{" "}
              </button>
            </Link>
          )}

          {todisplay}

          {table !== 0 &&
            tomapp.length === 5 &&
            tomapp[tomapp.length - 1] !=
              tabletodisplaytouser[tabletodisplaytouser.length - 1] && (
              <Link
                href={`${linktab}&todisplay=${pagetodisplay + 5}`}
                style={{ margin: "auto" }}
              >
                {" "}
                <button type="submit" class={classtodisplay} >
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    style={{ color: "white" }}
                  />{" "}
                </button>
              </Link>
            )}
        </div>
      )}
      ;
    </div>
  );
}
