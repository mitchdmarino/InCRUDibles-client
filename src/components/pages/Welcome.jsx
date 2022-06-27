import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <html>
      <main class="bg-cover bg-gradient-to-r from-cyan-500 to-blue-500">
        <head>
          <title>Welcome to CheckMate</title>
        </head>
        <body>
          <div class="">
            <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white pt-16 h-48 ">
              Not your average To-Do List.
            </h1>
            <br></br>

            <h2 className="text-white text-4xl tracking-tight h-24">
              Complete your goals with family members, roommates, colleagues,
              and more.
            </h2>
            <br></br>
            <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white white-space: nowrap p-2">
              Ready to join?
            </h3>
            <Link
              className="hover:text-blue-800 text-white p-0 dark:text-white display: inline-block  rounded-full p-2.5 bg-blue-600 "
              to="/register"
            >
              Get Started!
            </Link>
            <br></br>

            <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white p-8 flex justify-start">
              Invite your crew.
            </h3>
            <p className="text-white tracking-tight leading-6 text-2xl pb-8  h-48">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <br></br>
            <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white p-8 flex justify-end">
              Log your tasks.
            </h3>
            <p className="text-white tracking-tight leading-6 text-2xl pb-8  h-48">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <br></br>
            <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white p-8 flex justify-start">
              Complete your list.
            </h3>
            <p className="text-white tracking-tight leading-6 text-2xl pb-8  h-48">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <br></br>
          </div>
        </body>
      </main>
    </html>
  )
}
