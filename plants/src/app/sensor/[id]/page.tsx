'use client'
import { useParams } from "next/navigation";
import PlantCard from "@/components/plantcard";

export default function Sensor() {
     
    const params = useParams()
    const id = String(params.id)
    const imgName = `/plant${id}.jpg`
    
    interface PlantInfo {
        name: string,
        lastWatered: number,
        lastFed: number,
        recentMoisture: number
    }

    return (
    <>
    <div className="flex px-5">
        <PlantCard id={id} name="Flowers" />
    </div>
    </>)
}