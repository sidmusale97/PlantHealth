'use client'
import { Card, CardHeader, CardBody, CardFooter, Image, Link, Button } from "@nextui-org/react";
import { WaterButton, FeedButton } from "./buttons";
import LatestMoistureInfo from "./lastestmoisture";

export default function PlantCard({ id, name }: { id: number, name: string }) {
  const imgName = `/plant${id}.jpg`
  const route = `/sensor/${id}`


  function handleClick() {
    console.log("Button clicked")
  }


  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h1 className="text-tiny uppercase font-bold">{name}</h1>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Link href={route}>
            <Image
              alt={name}
              className="object-cover rounded-xl"
              src={imgName}
              width={270}
            />
          </Link>
        </CardBody>
        <CardFooter className="justify-center">
          <div className="flex-row space-x-5">
            <WaterButton id={id}/>
            <FeedButton id={id}/>
            <LatestMoistureInfo id={id}/>
          </div>
        </CardFooter>
      </Card>

    </>
  )
}