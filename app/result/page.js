import React from "react";
import ClientResultPage from "../(components)/ClientResultPage";
import { Suspense } from "react";
import { fetchbuses } from "../(components)/fetcz";
import { bUsstops } from "../(components)/BUSSTOPS";
import { whattimeisit } from "../(components)/whatdate";
export async function generateMetadata({ params, searchParams }, parent) {






  const uniquebusstops = Array.from(new Set(bUsstops));
  const start = uniquebusstops[searchParams.start];
  const koniec = uniquebusstops[searchParams.koniec];
  

  const title =
    start !== undefined && koniec !== undefined
      ? `${start} ---> ${koniec}`
      : "wyszukaj połączenia";
  const description =
    start !== undefined && koniec !== undefined
      ? `Przystanek początkowy: ${start}
        Przystanek końcowy: ${koniec}. Sprawdź aktualnie obowiązujący rozkład jazdy `
      : `Aplikacja do wyświetlania najbliższych godzin odjazdu poszczególnych lini autobusowych z wybranego miejsca startowego do miejsca docelowego`;

  return {
    title: `${title}`,
    description: `${description}`,
  };
}

export default async function Page({ params, searchParams }) {
  const classtodisplay =
    "inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]";
  const pagetodisplay = searchParams.todisplay * 1;

  const tab = searchParams?.tab?.split("/");
  const start = searchParams.start;
  const end = searchParams.koniec;

  let table = tab ? [...tab].splice(0, tab.length - 1) : [];

  const tabletodisplaytouser = await fetchbuses(start, end);

  return (
    <>
      <ClientResultPage
        Filtredbuses={tabletodisplaytouser[1]}
        data={tabletodisplaytouser[0]}
        pagetodisplay={pagetodisplay}
        tab={tabletodisplaytouser[2]}
        linktab={`result?start=${searchParams.start}&koniec=${searchParams.koniec}`}
      />
    </>
  );
}
