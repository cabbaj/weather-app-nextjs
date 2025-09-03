import Weather from "./components/Weather";

export default async function Home() {
  return (
    <>
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white ">
        <Weather />
      </main>
    </>
  );
}
