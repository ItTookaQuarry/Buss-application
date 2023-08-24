"use client"
import React from 'react'
import Link from 'next/link'

import { buses } from './(components)/buses'
import { FaBus } from 'react-icons/fa';
import { Createtabofstops } from './(components)/Createtabofstops';

import { useWindowSize } from "@uidotdev/usehooks";
import pkm from "/public/pkm23.jpg";
import Image from 'next/image';
export default function page() {
  const classtodisplay =
    "inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]";

    const size = useWindowSize();
const mappedbusses=buses.map((each,index)=>{
  const todisplay= index===0 ? each.toUpperCase() : each
  return (

    <Link href={each}>
    <div className={classtodisplay } style={{margin:"auto",display:"flex",textAlign:"center", margin:"auto",fontSize:"1.5em", gridTemplateColumns:"1fr 1fr 1fr"}}>
    
   
 <div style={{margin:"auto",display:"grid", textAlign:"center"}}><FaBus style={{margin:"auto"}} /> {`${   todisplay}`}  </div>    <p style={{fontSize:"0.7em",margin:"auto"}}> Rozkład jazdy </p>
 


   </div></Link>
  )
})


let  gridColumn= size.width>1000 ?  "repeat(5,1fr)" : "repeat(4,1fr)"

if(size.width<900){
  gridColumn="repeat(3,1fr)"
}

if(size.width<700){
  gridColumn="repeat(2,1fr)"
}





  
  return (
    
<div>      <Image src={pkm} alt="bus"  
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}/>
    <div style={{display:"grid",gridTemplateColumns:`${gridColumn}`,position:"relative",height:`${size.height}px`,gap:"1%" ,overflowY:"scroll"} }   >
<Link href={"result"} style={{gridColumn:"1/-1",margin:"auto",textAlign:"center",}} className={classtodisplay}> Sprawdź Połączenia
      </Link>
      {mappedbusses}
      
      </div>
      </div>
  )
}
