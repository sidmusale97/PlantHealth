'use client'
import { useParams } from "next/navigation";
import PlantCard from "@/components/plantcard";
import { Image, Button, Link } from "@nextui-org/react";
import LatestMoistureInfo from "@/components/lastestmoisture";
import { error } from "console";
import { WaterButton, FeedButton } from "@/components/buttons";

export default function Sensor() {

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
                    <div className="flex flex-row p-2 m-2">
                        <WaterButton id={id} />
                    </div>
                    <FeedButton id={id} />
                </div>
          
            </div>
        </>)
}