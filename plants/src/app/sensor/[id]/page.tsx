'use client'
import { useParams } from "next/navigation";
import PlantCard from "@/components/plantcard";
import { GetServerSideProps } from "next";

export const getProps : GetServerSideProps = async (context) => {
    const id = context.params!;
    const res = await fetch(`http://localhost:5000/plants/${id}`);
    const data = await res.json()
    console.log(data)
    return {
        props: { data, }
    };
};

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