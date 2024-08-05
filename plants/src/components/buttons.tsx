'use client'
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { PLANTS } from "@/data/plantsInfo";

const beUrl = process.env.NEXT_PUBLIC_HEALTH_URL

const handleClick = (type: string, id: number, setValue: any) => {

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
  },[id]);

  return (<>
    <Button variant="shadow" className="bg-green-500 p-5 m-3 rounded h-25 w-50" onPress={() => { handleClick("FEEDING", id, setLatestFed) }}>
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
  },[id]);

  return (<>
    <Button variant="shadow" className="bg-blue-300 p-5 m-3 rounded h-25 w-50" onPress={() => { handleClick("WATERING", id, setLatestWatered) }}>
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

export function PlantNavigationButton({direction, currentPlantId} : {direction :number, currentPlantId: number}) {
  const router = useRouter();
  const text = direction === -1 ? "Previous" : "Next";

  const handleClick = () => {
    let nextId : number;

    if (currentPlantId + direction > PLANTS.length ) {
      nextId = 1;
    }
    else if (currentPlantId + direction < 1) {
      nextId = PLANTS.length;
    }
    else {
      nextId = currentPlantId + direction;
    }
    router.push(`/sensor/${nextId}`);
  }

  return (<>
    <Button onPress={handleClick} className="bg-green-500 h-10 w-25 m-10 m-3 rounded">{text}</Button>
  </>)
}