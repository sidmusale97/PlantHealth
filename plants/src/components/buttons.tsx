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

export function calculateHowManyDaysAgo(timestamp: number) {
  const now = Math.floor(new Date().getTime()/1000);
  const diffInSeconds = now - timestamp;
  const daysDiff = diffInSeconds / (60 * 60 * 24);
  return Math.round(daysDiff);
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

    }, 600000);

    return () => clearInterval(interval);
  },);

  return (<>
    <Button variant="shadow" className="bg-green-500 p-5 mb-3 rounded" onPress={() => { handleClick("FEEDING", id, setLatestFed) }}>
      <div className="flex flex-col">
        <span className="font-bold">Feed</span>
        <span className="text-xs italic"> Last Fed:
          {calculateHowManyDaysAgo(latestFed) < 1 && <span className="ml-1">Less than a day ago</span>}
          {calculateHowManyDaysAgo(latestFed) >= 1 && <span className="ml-1">{calculateHowManyDaysAgo(latestFed)} Day(s) ago</span>}
        </span>
      </div>
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

    }, 600000);

    return () => clearInterval(interval);
  },);

  return (<>
    <Button variant="shadow" className="bg-blue-300 p-5 mb-3 rounded" onPress={() => { handleClick("WATERING", id, setLatestWatered) }}>
      <div className="flex flex-col">
        <span className="font-bold"> Water</span>
        <span className="text-xs italic"> Last Watered:
          {calculateHowManyDaysAgo(latestWater) < 1 && <span className="ml-1">Less than a day ago</span>}
          {calculateHowManyDaysAgo(latestWater) >= 1 && <span className="ml-1">{calculateHowManyDaysAgo(latestWater)} Day(s) ago</span>}
        </span>
      </div>
    </Button>
  </>)
}