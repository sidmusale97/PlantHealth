'use client'
import { Card, CardHeader, CardBody, CardFooter, Image, Link, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function PlantCard({id, name} : { id: string, name: string }) {
  const imgName = `/plant${id}.jpg`
  const route = `/sensor/${id}`

  const [latestMoisture, setLatestMoisture] = useState(0)

  function handleClick() {
    console.log("Button clicked")
  }

  useEffect(() => {
    const fetchData = async() => {
    try {
      const beUrl = process.env.NEXT_PUBLIC_BACKEND_URL
      console.log(`${beUrl}/latest-moisture/${id}`)
      const res = await fetch(`${beUrl}/latest-moisture/${id}`)
      const result = await res.json()
      setLatestMoisture(Number(result.moisture));
    } catch (error){
      console.log(error)
    };
    }
    fetchData();
  });


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
            <Button variant="shadow" className="bg-blue-300 px-10 py-1 rounded" onPress={handleClick}>Water</Button>
            <Button variant="shadow" className="bg-green-500 px-10 py-1 rounded" onPress={handleClick}>Feed</Button>
            <p className="text-left">Current Moisture: {latestMoisture}</p>
          </div>
        </CardFooter>
      </Card>

    </>
  )
}