"use client";
import React from "react";
import Image from "next/image";
import pkm from "/public/pkm23.jpg";
import Link from "next/link";
import Stop from "./stops";
import { useWindowSize } from "@uidotdev/usehooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faCircleXmark,
  faRotate,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export default function RozkładClient(props) {

const beginignstate= props.res[0].length===2 ? 0 : "12" 

  const [indekst, seti] = React.useState(beginignstate);
const [val,setvalue]= React.useState("")
  let fr = "1fr";

  const size = useWindowSize();

  if (size.width < 700) {
    fr = "5fr";
  }

  const classtodisplay =
    "inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]";
  const [state, setstate] = React.useState("124");
  let res = props.res;
  const bus = props.bus;
  let hours = props.hours;
  const directions = [];
  let hourstoDisplay = false;
  let value = -1;
  let splicetab = [];
  const indekstodisplay = 1;
  console.log(splicetab)
  const mappedtable = res[0].map((each, index) => {
    let indeks = index;
    const l = res[0].length;
    return each.map((each, index) => {
      const direction = each.dire;
      const lengt=each.stops.length
      directions.push(direction);
      return (
        <>
          <div
            style={{
              gridColumn: "1/2",
              display: "grid",
              textAlign: "center",
              gap: "5px",
            }}
          >
     <Link href="/"><div className={classtodisplay}> <FontAwesomeIcon icon={faArrowLeft} /> Rozkład Jazdy</div> </Link>
            <h1
              className={classtodisplay}
              style={{ textAlign: "center", margin: "auto" }}
            >
              {" "}
              <strong>Kierunek : {each.dire} </strong>
            </h1>
            {l === 2 && (
              <div
                className={classtodisplay}
                style={{ margin: "auto" }}
                onClick={() => {

                   let toreturn= indeks==0 ? 1 : 0


                  return seti(toreturn);
                }}
              >
                <FontAwesomeIcon icon={faRotate} /> Zmień Kierunek
              </div>
            )}
            
            {each.stops.map((each, i) => {
              value = value + 1;
           
         if(i===lengt-1){
            splicetab.push(value)
         }




              if (value === hours * 1) {
                hourstoDisplay = (
                  <div
                    style={{
                      gridColumn:"2/3",
                      display:"grid",
                      height:"300px",
                      gap:"5%",
                    }}
                  >
                    {" "}
                  <div style={{margin:"auto",display:"grid",gap:"4%",gridTemplateColumns:"5fr 1fr"}}  >    
                  
               

                      <h2 className={classtodisplay} style={{gridColumn:"1/2"}}>Kierunek: {direction} 
                      </h2>
                    <Link href={`http://localhost:3000/${bus}`}> <div style={{gridColumn:"2/3",margin:"auto"}} className={classtodisplay}><FontAwesomeIcon icon={faCircleXmark}  /></div>
                    </Link> 
                    <div className={classtodisplay} style={{gridColumn:"1/3",margin:"auto"}}> Przystanek: {each}</div>
                    
                    
                    </div>
            
                    <Stop
                      hours={res[1][value]}
                    ></Stop>{" "}
                  </div>
                );
              }

            
              return (
            <>
        
        {each!==direction&&    <Link
                    className={classtodisplay}
                    href={`http://localhost:3000/${bus}?hours=${value}`}
                  >
                    <h1 style={{ margin: "auto" }}> {each}</h1>
                  </Link>}

                  {each===direction&&    
                    <h1  className={classtodisplay}> {each}</h1>}



                </>
              );
            })}
            <br></br>
          </div>
        </>
      );

      
    });
  });
console.log(mappedtable)
  return (
    <>

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

{!hourstoDisplay&&
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `1fr ${fr} 1fr`,
          position: "relative",
          overflowY: "scroll",
          height: `${size.height}px`,
          width: `"100vw",`,
        }}
      >
        {indekst!==1&&indekst!==0&&
        <div style={{ gridColumn: "2/3", gridTemplateColumns: "1fr" }}>
          {mappedtable}
        </div>}

        {indekst===0&&
        <div style={{ gridColumn: "2/3", gridTemplateColumns: "1fr" }}>
          {mappedtable[0]}
        </div>}

        {indekst===1&&
        <div style={{ gridColumn: "2/3", gridTemplateColumns: "1fr" }}>
          {mappedtable[1]}
        </div>}

        
      </div>}



      {hourstoDisplay && <div    style={{
          display: "grid",
          gridTemplateColumns: `1fr ${fr} 1fr`,
          position: "relative",
          overflowY: "scroll",
          height: `${size.height}px`,
          width: `"100vw",`,
        }}>{hourstoDisplay}</div>}




      
    </>
  );
}
