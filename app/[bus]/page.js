"use server"
import RozkładClient from "../(components)/RozkładClient";
export default async function Bus({ params, searchParams }) {
  const hours = searchParams.hours;

  const data = await fetch(`http://localhost:3000/api/${params.bus}`);

  const res = await data.json();
  return(<RozkładClient res={res} hours={hours} bus={params.bus} />)
}
