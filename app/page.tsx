import Header from "@/components/hero";

/**
 * Index component - The main landing page of the application.
 * @returns {JSX.Element} The rendered component.
 */
export default async function Index() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <p>
          For testing purposes, you can log in with the following credentials:
        </p>
        <ul className="list-disc pl-5">
          <li>Email: admin@test.com</li>
          <li>Password: password</li>
        </ul>
        <p>
          Feel free to create, edit or delete any workouts or exercises in this account.
        </p>
        <h2 className="font-medium text-xl mb-4">About the App</h2>
        <p>
          This app is a fitness scheduler. It allows you to create your own workouts
          and exercises. You can then schedule these workouts and exercises on a calendar
          which you can then set up to notify you when it's time to work out.
        </p>
      </main>
    </>
  );
}
