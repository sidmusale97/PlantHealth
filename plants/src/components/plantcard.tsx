'use client'
import { Card, CardHeader, CardBody, CardFooter, Image, Link, Button } from "@nextui-org/react";

export default function PlantCard({id, name}) {
    const imgName = `/plant${id}.jpg`
    const route = `/sensor/${id}`
    console.log(route)

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
            <Button variant="shadow" className="bg-blue-300 px-10 py-1 rounded"  onPress={handleClick}>Water</Button> 
            <Button variant="shadow" className="bg-green-500 px-10 py-1 rounded" onPress={handleClick}>Feed</Button> 
            </div>
            
          </CardFooter>
        </Card>
        
        </>
    )
}