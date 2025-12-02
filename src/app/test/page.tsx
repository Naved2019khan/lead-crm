"use client"

import StepOne from "@/components/form/flight-form/step-one";
import StepTwo from "@/components/form/flight-form/step-two";
import { getAgencySites } from "@/services/api/product-api";
import { useEffect } from "react"


const Page = () => {
 async function fetchData(){
    const res = await getAgencySites();
 }

    useEffect(() => {
        // fetchData();
    },[])
  return (
    <div><StepTwo /></div>
  )
}

export default Page