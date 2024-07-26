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
            <div className="flex flex-row p-10">
                <div className="flex-col p-3 justify-center">
                    <h1 className="text-center bg-green-100 text-2xl">Name</h1>
                    <Image className="object-cover rounded" width={200} src={imgName} />
                    <LatestMoistureInfo id={id} />
                </div>
                <div className="flex flex-col p-3">
                    <h3 className="p-3 text-lg">Description</h3>
                    <WaterButton id={id} />
                    <FeedButton id={id} />
                    <MoistureGraph id={id} />
                </div>
          
            </div>
        </>)
}