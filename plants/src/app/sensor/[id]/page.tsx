'use client'
import { useParams } from "next/navigation";
import { Image, Button, Link } from "@nextui-org/react";
import LatestMoistureInfo from "@/components/lastestmoisture";
import { WaterButton, FeedButton, PlantNavigationButton } from "@/components/buttons";
import MoistureGraph from "./MoistureGraph";
import { useState, useEffect } from "react";
import { PlantInfo } from "@/data/plantsInfo";

const infoUrl = process.env.NEXT_PUBLIC_INFO_URL;

export default function Sensor() {

    const params = useParams()
    const id = Number(params.id)
    const imgName = `https://storage.googleapis.com/sid-plants/plant${id}.jpg`

    const [plant, setPlant] = useState<PlantInfo>({id: id, name: "", careInstructions: "", sensorId: -1})
    const fetchData = async () => {
      try {
        const res = await fetch(`${infoUrl}/plant/${id}`)
        const result = await res.json()
        setPlant(result);
        console.log(plant);
      } catch (error) {
        console.log(error)
      };
    }
  
    useEffect(() => {
      fetchData();
    },[]);

    return (
        <>
        <div className="flex flex-row m-2">
          <PlantNavigationButton direction={-1} currentPlantId={id} />
          <div className="flex flex-col justify-center items-center pt-1 mt-1" id="plant">
            <h1 className="text-center bg-green-100 text-2xl ml-5">{plant.name}</h1>
            <Image
              className="object-cover rounded mt-5"
              width={300}
              height={300} // Added height for consistent image dimensions
              src={imgName}
              alt="Description of image" // Added alt text for accessibility
            />
            <LatestMoistureInfo id={id} />
            <div className="flex flex-row space-x-2 mt-2"> {/* Added space-x-2 for spacing between buttons */}
              <WaterButton id={id} />
              <FeedButton id={id} />
            </div>
          </div>
          <div className="flex flex-col pt-6 mt-6">
            <MoistureGraph id={id} />
          </div>
          <PlantNavigationButton direction={1} currentPlantId={id} />
        </div>
      </>)
}