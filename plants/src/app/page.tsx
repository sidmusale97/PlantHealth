import PlantCard from "@/components/plantcard";
import { PlantInfo, PLANTS } from "@/data/plantsInfo";

function chunkArray(array : PlantInfo[], chunkSize: number) {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
    array.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent">
          <tbody>
          {chunkArray(PLANTS, 3).map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-transparent">
                {row.map((plant) => (
                  <td key={plant.id} className="hover:bg-gray-200 border-b p-4">
                    <PlantCard id={plant.id} name={plant.name} />
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
