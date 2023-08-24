"use client";
import { FaBus } from "react-icons/fa";

import React from "react";

export default function Departure(props) {
  return (
    <>
      <div style={{ gridColumn: "1/2" ,display:"flex", gap:"3px",alignItems:"center",justifyContent:"center"}}>
        {" "}
        <FaBus />
        
        {`  ${props.bus}`}{" "}
      </div>

      <div
        style={{ textAlign: "center", gridColumn: "2/3", fontWeight: "bold" }}
      >
        {props.hour}
      </div>

      {props.depzero === 0 && (
        <div style={{ gridColumn: "1/4" }}>
          <strong> {props.depone} min do Odjazdu </strong>
        </div>
      )}
      {props.depone === 0 && (
        <div style={{ gridColumn: "1/4" }}>
          <strong> {props.depzero} h do Odjazdu</strong>
        </div>
      )}
      {props.depone !== 0 && props.depzero !== 0 && (
        <div style={{ gridColumn: "1/4" }}>
          <strong>
            {props.depzero} h {props.depone} min do Odjazdu
          </strong>
        </div>
      )}
    </>
  );
}
