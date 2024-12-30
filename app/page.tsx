import Header from "@/components/hero";

export default async function Index() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <p>
          For testing purposes, you can log in with the following credentials:
        </p>
        <p>Email: admin@test.com</p>
        <p>Password: password</p>
        <h2 className="font-medium text-xl mb-4">About the App</h2>
        <p>
          This app is a fitness scheduler. It allows you to schedule workouts
          and exercises.
        </p>
      </main>
    </>
  );
}
