"use client";
import { useEffect, useState } from "react";
import React from "react";
import { redirect } from "next/navigation";
import { bUsstops } from "./BUSSTOPS";
import {
  faArrowLeft,
  faArrowsRotate,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { buses } from "./buses";
import Link from "next/link";
export default function Form() {
  const classtodisplay =
    "inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]";
  const searchParams = useSearchParams();
  const uniquebusstops = Array.from(new Set(bUsstops));

  const [pocz, setPocz] = useState("");

  const [koniec, setKoniec] = useState("");

  function ChangePocz(event) {
    setPocz(event.target.value);
  }

  function ChangeKoniec(event) {
    setKoniec(event.target.value);
  }

  const busforStart = uniquebusstops
    .filter((each) => {
      const busstringtoarray = [...each];

      return busstringtoarray.splice(0, pocz.length).join("") === pocz;
    })
    .map((each) => {
      return <option>{each}</option>;
    });

  const busforEnd = uniquebusstops
    .filter((each) => {
      const busstringtoarray = [...each];

      return busstringtoarray.splice(0, koniec.length).join("") === koniec;
    })
    .map((each) => {
      return <option>{each}</option>;
    });

  return (
    <>
  <Link href="/"><div className={classtodisplay}> <FontAwesomeIcon icon={faArrowLeft} /> Rozkład Jazdy</div> </Link>
      <input
      style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}
        className="formplaceholder"
        defaultValue={pocz}
        name={`Pocz`}
        onChange={ChangePocz}
        list="buses1"
        placeholder="Początek" 
      />
      <datalist id="buses1">{busforStart}</datalist>

      <input
      placeholder="Koniec"
        className="formplaceholder"
        defaultValue={koniec}
        name={`Koniec`}
        onChange={ChangeKoniec}
        list="buses2"
      />

      <datalist id="buses2">{busforEnd}</datalist>
      <button type="submit" class={classtodisplay}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </>
  );
}
