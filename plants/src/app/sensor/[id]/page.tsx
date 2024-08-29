'use client'
import { useParams } from "next/navigation";
import { Image, Button, Link, Input, Textarea } from "@nextui-org/react";
import LatestMoistureInfo from "@/components/lastestmoisture";
import { WaterButton, FeedButton, PlantNavigationButton } from "@/components/buttons";
import MoistureGraph from "./MoistureGraph";
import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { PlantInfo } from "@/data/plantsInfo";
import debounce from "lodash/debounce";

const infoUrl = process.env.NEXT_PUBLIC_INFO_URL;

export default function Sensor() {

  const params = useParams()
  const id = Number(params.id)
  const imgName = `https://storage.googleapis.com/sid-plants/plant${id}.jpg`

  const [plant, setPlant] = useState<PlantInfo>({ id: id, name: "", careInstructions: "", sensorId: -1 })
  const fetchData = async () => {
    try {
      const res = await fetch(`${infoUrl}/plant/${id}`)
      const result = await res.json()
      setPlant(result);
      console.log(plant);
    } catch (error) {
      console.log(error)
    };
  }

  const saveInstructions = useCallback(
    debounce(async () => {
      try {
        const response = await fetch(`${infoUrl}/plant`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plant),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data saved successfully:', data);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }, 1000), // Debounce delay of 1000 milliseconds
    [plant] // Dependencies for useCallback
  );

  useEffect(() => {
    // Call the debounced function when `plant` changes
    saveInstructions();

    // Cleanup function to cancel any pending debounced calls
    return () => {
      saveInstructions.cancel();
    };
  }, [plant, saveInstructions]);

  useEffect(() => {
    fetchData();
  }, []);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPlant = { ...plant, careInstructions: event.target.value }
    setPlant(newPlant)
  };

  return (
    <>
      <div className="flex flex-row m-2">
        <PlantNavigationButton direction={-1} currentPlantId={id} />
        <div className="flex flex-col justify-center items-center pt-1 mt-1" id="plant">
          <h1 className="text-center bg-green-100 text-2xl ml-5">{plant.name}</h1>
          <Image
            className="object-cover rounded mt-5"
            width={300}
            height={300} // Added height for consistent image dimensions
            src={imgName}
            alt="Description of image" // Added alt text for accessibility
          />
          <LatestMoistureInfo id={plant.sensorId} />
          <div className="flex flex-row space-x-2 mt-2"> {/* Added space-x-2 for spacing between buttons */}
            <WaterButton id={plant.sensorId} />
            <FeedButton id={plant.sensorId} />
          </div>
        </div>
        <div className="p-6 m-6">
          <MoistureGraph id={plant.sensorId} />
          <div className="text-center mt-3 pt-3">
          <h1 className="font-bold text-xl">Care Instructions</h1>
          <Textarea id="careTextbox" value={plant.careInstructions} rows={8} cols={50} onChange={handleChange} className="flex text-center mt-4">Additional Information</Textarea>
          </div>
        </div>
        <PlantNavigationButton direction={1} currentPlantId={id} />
      </div>
    </>)
}