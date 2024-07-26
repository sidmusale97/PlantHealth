'use client'
import { useParams } from "next/navigation";
import { Image, Button, Link } from "@nextui-org/react";
import LatestMoistureInfo from "@/components/lastestmoisture";
import { error } from "console";
import { WaterButton, FeedButton } from "@/components/buttons";
import { useState } from "react";
import MoistureGraph from "./MoistureGraph";

export default function Sensor() {

    const [moistures, setMoitures] = useState([])

    const params = useParams()
    const id = Number(params.id)
    const imgName = `/plant${id}.jpg`

    


    interface PlantInfo {
        name: string,
        lastWatered: number,
        lastFed: number,
        recentMoisture: number
    }

    return (
        <>
        <div className="flex flex-row m-2">
          <div className="flex flex-col justify-center items-center pt-1 mt-1" id="plant">
            <h1 className="text-center bg-green-100 text-2xl ml-5">Name</h1>
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
        </div>
      </>)
}