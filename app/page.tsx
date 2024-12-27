import Header from "@/components/hero";

export default async function Index() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">About the App</h2>
        <p>
          This app is a fitness scheduler. It allows you to schedule workouts
          and exercises.
        </p>
      </main>
    </>
  );
}
