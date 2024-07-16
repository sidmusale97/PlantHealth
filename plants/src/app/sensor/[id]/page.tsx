'use client'
import { useParams } from "next/navigation";
import PlantCard from "@/components/plantcard";

export default function Sensor() {
     
    const params = useParams()
    const imgName = `/plant${params.id}.jpg`
    
    interface PlantInfo {
        name: string,
        lastWatered: number,
        lastFed: number,
        recentMoisture: number
    }

    return (
    <>
    <div className="flex px-5">
        <PlantCard id={params.id} name="Flowers" />
    </div>
    </>)
}