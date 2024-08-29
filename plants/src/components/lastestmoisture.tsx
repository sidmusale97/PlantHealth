'use client'
import { useEffect, useState } from "react";
import DecimalDisplay from "./DecimalDisplay";

const beUrl = process.env.NEXT_PUBLIC_HEALTH_URL

export default function LatestMoistureInfo({id} : {id: number}){

const [latestMoisture, setLatestMoisture] = useState(0)
const [dataTimestamp, setDataTimestamp] = useState(0)

const fetchData = async () => {
    try {
      const res = await fetch(`${beUrl}/latest-moisture/${id}`)
      const result = await res.json()
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

  return (<div className="flex-col p-3 text-center justify-center">
    <p> Current Humidity: 
      {latestMoisture > 0  && <DecimalDisplay decimal={latestMoisture}/>}
      {latestMoisture <= 0 && <span className="ml-3 text-red-500 italic">No sensor reading</span>}
    </p>
    <p>Last Updated: {new Date(dataTimestamp*1000).toLocaleString()}</p>
  </div>)
}