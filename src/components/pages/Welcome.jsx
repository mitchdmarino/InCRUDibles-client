import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <html>
      <head>
        <title>Welcome to CheckMate</title>
      </head>
      <body>
        <div>
          <h1 className="text-center tracking-tight text-5xl self-center font-semibold dark:text-white">
            Not your average To-Do List.
          </h1>
          <br></br>

          <h2 className="text-5xl tracking-tight">
            Work together with family members, roommates, colleagues, and more.
          </h2>
          <br></br>
          <h3 className="tracking-tight text-4xl self-center font-semibold dark:text-white">
            Ready to join?
          </h3>
          <Link
            className="hover:text-blue-800 bg-transparent text-blue-500 p-0 dark:text-white"
            to="/register"
          >
            Get Started!
          </Link>
          <br></br>
          <h3 className="tracking-tight text-4xl self-center font-semibold dark:text-white">
            Invite your crew.
          </h3>
          <p className="tracking-tight leading-6 text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <br></br>
          <h3 className="tracking-tight text-4xl self-center font-semibold dark:text-white">
            Log your tasks.
          </h3>
          <p className="tracking-tight leading-6 text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <br></br>
          <h3 className="tracking-tight tracking-tight text-4xl self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Complete your list.
          </h3>
          <p className="tracking-tight leading-6 text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <br></br>
        </div>
      </body>
    </html>
  )
}
