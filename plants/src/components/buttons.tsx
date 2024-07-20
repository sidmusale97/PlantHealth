import { Button } from "@nextui-org/react";

const handleClick = (type: string, id: number) => {
    const beUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    fetch(`${beUrl}/event`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id, type}),
    }).then( response => {
      if (!response.ok) {
          throw new Error('Network issue')
      }
    }).then (data => {})
    .catch(error => {
      console.error("Error " + error);
    });

  }

export function FeedButton({id} : {id:number}) {
 return(<>
    <Button variant="shadow" className="bg-green-500 p-5 mb-3 rounded" onPress={() => {handleClick("FEEDING", id)}}>
        <div className="font-bold">Feed</div>
        <div className="text-xs ">small text underneath</div>
    </Button>
 </>)
}

export function WaterButton({id} : {id:number}) {
 
    return (<>
        <Button variant="shadow" className="bg-blue-300 p-5 mb-3 rounded" onPress={() => {handleClick("WATERING", id)}}>
            <div className="font-bold"> Water</div>
            <div className="text-xs ">small text underneath</div>  
        </Button>
 </>)
}