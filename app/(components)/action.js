"use server"
import { redirect } from "next/navigation";
import { buses } from "./buses";
import { bUsstops } from "./BUSSTOPS";
import { Start } from "@mui/icons-material";
export async function myAction(formData) {
  const uniquebusstops = Array.from(new Set(bUsstops));

    const Początek = formData.get("Pocz");
    const Koniec = formData.get("Koniec");

  if(uniquebusstops.indexOf(Początek)!==-1&&uniquebusstops.indexOf(Koniec)!==-1)[
    redirect(`result?start=${uniquebusstops.indexOf(Początek)}&koniec=${uniquebusstops.indexOf(Koniec)}&todisplay=1`)
  ]

else{redirect("result")}

 
  }