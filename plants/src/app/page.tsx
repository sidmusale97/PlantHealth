import PlantCard from "@/components/plantcard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent">
          <tbody>
            <tr className="bg-transparent">
              <td className="hover:bg-gray-200 border-b p-4"><PlantCard id="1" name="Flowers" /> </td>
              <td className="hover:bg-gray-200 border-b p-4"><PlantCard id="2" name="Wonderful Ivy" /> </td>
              <td className="hover:bg-gray-200 border-b p-4"><PlantCard id="3" name="Succulent" /> </td>
            </tr>
            <tr className="bg-transparent">
              <td className="hover:bg-gray-200 border-b p-4"><PlantCard id="4" name="Mint" /> </td>
              <td className="hover:bg-gray-200 border-b p-4"><PlantCard id="5" name="Dragonscale" /> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
