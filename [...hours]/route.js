import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import puppeteer from "puppeteer";
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
export async function GET(request, { params }) {
  

//This file was orgianlly in my-app/api and it was used to generate Api endpoints about all the buses//

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
`https://www.pkm.jaworzno.pl/${params.hours[0]}/${params.hours[1]}`
  );

  await page.setViewport({ width: 1080, height: 1024 });
  const lastPosition = await scrollPageToBottom(page, {
    size: 110,
    delay: 0,
  });

  const data = await page.evaluate(() => {
    const schedules = Array.from(document.querySelectorAll(".stop-schedule"));
    const ArraytoReturn = [];
    for (let i = 0; i < schedules.length; i++) {
      const text = schedules[i].querySelector(".header").innerHTML;

      const ul = Array.from(schedules[i].getElementsByTagName("ul"));

      const li = Array.from(ul[0].getElementsByTagName("li"));

      const mappedlist = li.map((each) => {
        const a = Array.from(each.getElementsByTagName("a"));

        return a[0].innerText;
      });

      ArraytoReturn.push({ Days: text, length: mappedlist });
    }

    return ArraytoReturn;
  });








  

  return NextResponse.json(data);
}
