"use client";
import { useEffect, useState } from "react";
import React from "react";
import { redirect } from "next/navigation";
import { bUsstops } from "./BUSSTOPS";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
export default function Form(props) {
  const classtodisplay =
    "inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]";
  const searchParams = useSearchParams();
  const uniquebusstops = Array.from(new Set(bUsstops));
  function changeprzystanek(each) {

    setPocz(each);
    props.funct(true)
    setisfocusedpocz(false);
  }

  function changeprzystanek2(each) {
  
    setKoniec(each);
    props.funct(true)
    setisfocusedkoniec(false);
  }

  const [isfocusedkoniec, setisfocusedkoniec] = React.useState("");

  const [isfocusedpocz, setisfocusedpocz] = React.useState("");

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
      return (
        <div
          className={classtodisplay}
          style={{ height: "50px", margin: "auto" }}
          onClick={() => {
            changeprzystanek(each);
          }}
        >
          {each}
        </div>
      );
    });

  const busforEnd = uniquebusstops
    .filter((each) => {
      const busstringtoarray = [...each];

      return busstringtoarray.splice(0, koniec.length).join("") === koniec;
    })
    .map((each) => {
      return (
        <div
          className={classtodisplay}
          style={{ height: "50px", margin: "auto" }}
          onClick={() => {
            changeprzystanek2(each);
          }}
        >
          {each}
        </div>
      );
    });





  const heightStart =
    busforStart.length * 50 > 300 ? "300px" : `${busforStart.length * 50}px`;

    const heightend =     busforEnd.length * 50 > 300 ? "300px" : `${busforEnd.length * 50}px`;

  return (
    <>
      <form
      autocomplete="off" 
        style={{
          gridColumn: "2/3",
          margin: "auto",
          display: "grid",
          textAlign: "center",
          position: "relative",
          gap: "5%",
        }}
      >
        <Link href="/">
          <div
            className={classtodisplay}
            style={{ display: "grid", gridTemplateColumns: "1fr 10fr" }}
          >
            {" "}
            <FaArrowLeft />{" "}
            <div style={{ margin: "auto", textAlign: "center" }}>
              {" "}
              Rozkład Jazdy
            </div>{" "}
          </div>{" "}
        </Link>

        <input
          onFocus={() => {
            setisfocusedkoniec(false)
            setisfocusedpocz(true);
            props.funct(false)
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            color: "black",
          }}
          className="formplaceholder"
          value={pocz}
          name={`Pocz`}
          onChange={ChangePocz}
          list="buses1"
          placeholder="Początek"
        />
    

        <input    
        
        onFocus={() => {
          setisfocusedpocz(false);
            setisfocusedkoniec(true);
            props.funct(false)
          }}
        
          placeholder="Koniec"
          className="formplaceholder"
          value={koniec}
          name={`Koniec`}
          onChange={ChangeKoniec}
          list="buses2"
        />

  

        <Link
          href={`result?start=${uniquebusstops.indexOf(
            pocz
          )}&koniec=${uniquebusstops.indexOf(koniec)}&todisplay=1`}
        >
          <button
            type="submit"
            onClick={()=>{props.funct(true) 
              setisfocusedpocz(false)
            }}
            
            class={classtodisplay}
            style={{ display: "grid", margin: "auto" }}
          >
            <FaSearch style={{ margin: "auto" }} />
          </button>
        </Link>
      </form>

      {isfocusedpocz && pocz.length >= 1 && (
        <div
          style={{
            gridColumn: "2/3",
            margin: "auto",
            display: "grid",
            textAlign: "center",
            position: "relative",
            top: "25px",
            height: `${heightStart}`,
            overflowY: "scroll",
            gap: "1px",
          }}
        >
          {" "}
          {busforStart}{" "}
        </div>
      )}
      {isfocusedkoniec && koniec.length >= 1 && (
        <div
          style={{
            height:`${heightend }`,
            gridColumn: "2/3",
            margin: "auto",
            display: "grid",
            textAlign: "center",
            position: "relative",
            top: "25px",
            overflowY: "scroll",
            gap: "1px",
          }}
        >
          {" "}
          {busforEnd}{" "}
        </div>
      )}
 
    </>
  );
}
