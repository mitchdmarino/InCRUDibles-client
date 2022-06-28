import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <main class="bg-cover bg-gradient-to-r from-cyan-500 to-blue-500">
      <div>
        <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white pt-20">
          We're not your average check list.
        </h1>
        <br></br>
        <h2 className="text-white tracking-tight leading-6 text-2xl pb-20 px-80">
          Complete your goals with family members, roommates, colleagues, and
          more.
        </h2>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white white-space: nowrap p-2">
          Ready to join?{" "}
          <Link
            className="hover:bg-white hover:text-blue-600 text-2xl text-white p-0 dark:text-white display: inline-block  rounded-full p-2.5 bg-blue-600 shadow-lg shadow-indigo-500/40 over:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out"
            to="/register"
          >
            {" "}
            Get Started
          </Link>
        </h3>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white pl-36 pt-20 pb-4 flex justify-start">
          Invite your crew.
        </h3>
        <p className="text-white tracking-tight leading-6 text-2xl pb-8 h-48 pr-80 mr-60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white pr-36 pb-4 flex justify-end">
          Log your tasks.
        </h3>
        <p className="text-white tracking-tight leading-6 text-2xl pb-8 h-48 pl-80 ml-60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white pl-36 pb-4 flex justify-start">
          Complete your list.
        </h3>
        <p className="text-white tracking-tight leading-6 text-2xl pb-8 h-48 pr-80 mr-60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white p-8 flex justify-end">
          Bask in the glory.
        </h3>
      </div>
    </main>
  )
}
