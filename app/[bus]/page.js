"use server"
import RozkładClient from "../(components)/RozkładClient";
export default async function Bus({ params, searchParams }) {
  const hours = searchParams.hours;

  const data = await fetch(`https://buss-application.vercel.app/api/${params.bus}`);

  const res = await data.json();
  return(<RozkładClient res={res} hours={hours} bus={params.bus} />)
}
