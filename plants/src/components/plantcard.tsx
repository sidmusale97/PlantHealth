'use client'
import { Card, CardHeader, CardBody, CardFooter, Image, Link, Button } from "@nextui-org/react";
import { WaterButton, FeedButton } from './buttons'
import LatestMoistureInfo from "./lastestmoisture";
import { useState , useEffect} from "react";
import { PlantInfo } from "@/data/plantsInfo";

const infoUrl = process.env.NEXT_PUBLIC_INFO_URL;

export default function PlantCard(plant: PlantInfo) {

  
  const imgName = `https://storage.googleapis.com/sid-plants/plant${plant.id}.jpg`
  const route = `/sensor/${plant.id}`

  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h1 className="text-tiny uppercase font-bold">{plant.name}</h1>
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center">
          <Link href={route}>
            <Image
              alt={plant.name}
              className="object-cover rounded-xl"
              src={imgName}
              width={270}
            />
          </Link>
        </CardBody>
        <CardFooter className="justify-center">
          <div className="flex flex-col">
            <WaterButton id={plant.sensorId}/>
            <FeedButton id={plant.sensorId}/>
            <LatestMoistureInfo id={plant.sensorId}/>
          </div>
        </CardFooter>
      </Card>

    </>
  )
}