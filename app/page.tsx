import Weather from "./components/Weather";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center text-black">
        <Weather />
      </main>
    </>
  );
}
