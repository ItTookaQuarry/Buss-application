import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import puppeteer from "puppeteer";
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
//This file was orgianlly in my-app/api and it was used to generate Api endpoints about all the buses//
export async function GET(request, { params }) {
  const axios = require("axios");

  const busname = params.Buses;
  const { writeFile } = require("fs/promises");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const fs = require("fs");
  const fse = require('fs-extra');
  async function writestops(data,data2) {
    await fse.outputFile(
      `app/api/${busname}/route.js`,
      `import { NextResponse } from "next/server"
      export async function GET(request, { params }) {
        return NextResponse.json(${JSON.stringify([data,data2])})
      
      
      }`

  
    );
  }


  // const pathname = `https://www.pkm.jaworzno.pl/rozklady/linia-${busname}.html`;

  await page.goto(pathname);

  await page.setViewport({ width: 1080, height: 1024 });
  const lastPosition = await scrollPageToBottom(page, {
    size: 110,
    delay: 0,
  });

  const data = await page.evaluate(() => {
    const container = Array.from(document.querySelectorAll(".route-container"));
    const shedule = document
      .querySelector(".schedule-expire")
      .getElementsByTagName("time");

    const TableOfStops = [];

    for (let i = 0; i < container.length; i++) {
      const indeks = i;
      const directions = Array.from(
        document.getElementsByClassName("route-direction")
      );

      const spans = Array.from(directions[i].getElementsByTagName("span"));

      const stops = Array.from(
        container[i].getElementsByClassName("hover-system  hover-on")
      );

      mapped = stops.map((each, index) => {
        const array = Array.from(each.getElementsByTagName("a"));

        let table = array
          .map((each, index) => {
            const i = index;
            return each.text.replace(" ", "\n");
          })
          .filter((each, index) => {
            return index !== 0;
          });

        if (index === stops.length - 1) {
          const divv = Array.from(
            stops[stops.length - 1].getElementsByTagName("div")
          );
          return divv[divv.length - 1].textContent;
        }

        return table[0];
      });

      TableOfStops.push([
        {
          from: shedule[0].innerText,
          dire: spans[0].textContent,
          stops: mapped,
        },
      ]);
    }

    return TableOfStops;
  });

  
  const table = [];
  const stops = data.map((array, index) => {
    let indeks = index + 1;
    return array.map((each) => {
      const adresstoreverse = each.from.split(".").join("");
      const adress =
        [...adresstoreverse].splice(4, 4).join("") +
        [...adresstoreverse].splice(2, 2).join("") +
        [...adresstoreverse].splice(0, 2).join("");

      return each.stops.map((stop, i) => {
        let link;
        if (busname.length === 1) {
          link = `rozklady/rozklad-00${busname.toUpperCase()}_${adress}-${
            i + 1
          }-${indeks}.html`;
        }
        if (busname.length === 2) {
          link = `rozklady/rozklad-0${busname}_${adress}-${
            i + 1
          }-${indeks}.html`;
        }

        if (busname.length === 3) {
          link = `rozklady/rozklad-${busname}_${adress}-${
            i + 1
          }-${indeks}.html`;
        }
        const obj = { stop: [stop, `http://localhost:3000/api/${link}`] };
        table.push(fetch(`http://localhost:3000/api/${link}`));
        return obj;
      });
    });
  });
  try {
    const responses = await Promise.all(table);

    // Process responses
    const dataPromises = responses.map((response) => response.json()); // Parsing JSON data
    const dataArray = await Promise.all(dataPromises);
    await writestops(data,dataArray);
   
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
  }

  return NextResponse.json(data);
}
