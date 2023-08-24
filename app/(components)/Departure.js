"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBus } from "@fortawesome/free-solid-svg-icons";



import React from "react";

export default function Departure(props) {
  return (
    <>
    

        <div style={{gridColumn:"1/2"}}>       <FontAwesomeIcon icon={faBus} style={{ color: "white" }} />
        {`  ${props.bus}`} </div>   

 
       <div style={{ textAlign: "center",gridColumn:"2/3", fontWeight:"bold"}}>{props.hour}</div>

      {props.depzero === 0 && (
        <div style={{gridColumn:"1/4"}}>
          <strong> {props.depone} min do Odjazdu </strong>
        </div>
      )}
      {props.depone === 0 && (
        <div style={{gridColumn:"1/4"}}> 
          <strong> {props.depzero} h do Odjazdu</strong>
        </div>
      )}
      {props.depone !== 0 && props.depzero !== 0 && (
        <div style={{gridColumn:"1/4"}}>
          <strong>
            {props.depzero} h {props.depone} min do Odjazdu
          </strong>
        </div>
      )}
    </>
  );
}
