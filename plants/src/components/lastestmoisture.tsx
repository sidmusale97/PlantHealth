'use client'
import { useEffect, useState } from "react";



export default function LatestMoistureInfo({id} : {id: number}){

const [latestMoisture, setLatestMoisture] = useState(0)
const [dataTimestamp, setDataTimestamp] = useState(0)

const fetchData = async () => {
    try {
      const beUrl = process.env.NEXT_PUBLIC_BACKEND_URL
      const res = await fetch(`${beUrl}/latest-moisture/${id}`)
      const result = await res.json()
      console.log(result)
      setLatestMoisture(Number(result.moisture));
      setDataTimestamp(Number(result.timestamp));
    } catch (error) {
      console.log(error)
    };
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    
    }, 60000);

    return () => clearInterval(interval);
  }, [id]);

  return (<div className="flex-col text-left p-3 justify-left">
    <p className="text-left">Current Moisture: {latestMoisture}</p>
    <p>Last Updated: {new Date(dataTimestamp*1000).toLocaleString()}</p>
  </div>)
}