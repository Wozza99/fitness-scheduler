export default async function Index() {
  return (
    <>
      <div className="flex flex-col gap-16 items-center">
        <h1>Fitness Scheduler</h1>
      </div>
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
