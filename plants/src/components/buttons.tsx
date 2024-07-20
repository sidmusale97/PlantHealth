'use client'
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

const beUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const handleClick = (type: string, id: number, setValue: any) => {
  const beUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  fetch(`${beUrl}/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, type }),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network issue')
    }
  }).then(data => { })
    .catch(error => {
      console.error("Error " + error);
    });
  
    setValue(new Date().getSeconds())
}

export function FeedButton({ id }: { id: number }) {

  const [latestFed, setLatestFed] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch(`${beUrl}/latest-feeding/${id}`)
      const result = await res.json()
      setLatestFed(Number(result));
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
  },);

  return (<>
    <Button variant="shadow" className="bg-green-500 p-5 mb-3 rounded" onPress={() => { handleClick("FEEDING", id, setLatestFed) }}>
      <div className="font-bold">Feed</div>
      <div className="text-xs ">{latestFed != 0 && <span>{new Date(latestFed * 1000).toLocaleString()}</span>}</div>
    </Button>
  </>)
}

export function WaterButton({ id }: { id: number }) {
  const [latestWater, setLatestWatered] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch(`${beUrl}/latest-watering/${id}`)
      const result = await res.json()
      setLatestWatered(Number(result));
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
  },);
  
  return (<>
    <Button variant="shadow" className="bg-blue-300 p-5 mb-3 rounded" onPress={() => { handleClick("WATERING", id, setLatestWatered) }}>
      <div className="font-bold"> Water</div>
      <div className="text-xs">{latestWater != 0 && <span>{new Date(latestWater * 1000).toLocaleString()}</span>}</div>
    </Button>
  </>)
}