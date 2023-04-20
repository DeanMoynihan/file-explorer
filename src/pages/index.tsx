import Display from "@/src/components/Molecules/Display/index";
import { fileType } from "@/src/utils/client";

export default function Home({data}: {data: fileType[]}) {
  return (
    <>
      <h1>File Explorer</h1>
      <h2>Dean Moynihan</h2>
      <Display data={data}/>
    </>
  );
}

export async function getServerSideProps() {
  try{
    if (process.env.NEXT_PUBLIC_API_TOKEN === undefined) {
      throw new Error("No API Key");
    }

    const res = await fetch(`https://dev.test.sega.co.uk/api/list`, {headers: {'x-secret-api-key': process.env.NEXT_PUBLIC_API_TOKEN}})

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json()

    return { props: { data } }
  }catch(e){
    console.error(e);
  }
}