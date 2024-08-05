'use client'
import PlantCard from "@/components/plantcard";
import { PlantInfo, PLANTS } from "@/data/plantsInfo";
import { useState, useEffect } from "react";

function chunkArray(array : PlantInfo[], chunkSize: number) {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
    array.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}

const infoUrl = process.env.NEXT_PUBLIC_INFO_URL;

export default function Home() {
  const [plants, setPlants] = useState([])
  const fetchData = async () => {
    try {
      const res = await fetch(`${infoUrl}/plants`)
      const result = await res.json()
      setPlants(result);
      console.log(plants);
    } catch (error) {
      console.log(error)
    };
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent">
          <tbody>
          {chunkArray(plants, 4).map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-transparent">
                {row.map((plant) => (
                  <td key={plant.id} className="hover:bg-gray-200 border-b p-4">
                    <PlantCard id={plant.id} name={plant.name} careInstructions={plant.careInstructions} sensorId={plant.sensorId}/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
