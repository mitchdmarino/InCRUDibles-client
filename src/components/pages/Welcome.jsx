import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <main>
      <div>
        <h1 className="text-white text-center tracking-tight text-6xl self-center font-bold dark:text-white pt-28">
          Not your average check list.
        </h1>
        <br></br>
        <h2 className="text-white tracking-tight leading-6 text-2xl pb-20 px-80">
          Complete your goals with family members, roommates, colleagues, and
          more.
        </h2>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-bold dark:text-white white-space: nowrap p-2">
          Ready to join?{" "}
          <Link
            className="hover:bg-white hover:text-blue-600 text-xl text-white p-0 dark:text-white display: inline-block  rounded-full p-2.5 bg-blue-800 shadow-lg shadow-indigo-500/40 over:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out"
            to="/register"
          >
            {" "}
            Get Started
          </Link>
        </h3>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-bold dark:text-white pl-30 pt-20 pb-4 ml-12 flex justify-start">
          See the Big Picture
        </h3>
        <p className="text-white text-left tracking-tight leading-6 text-2xl pb-8 h-48 ml-3 pr-70 mr-60">
         Use CheckMate to achieve your goals and get more out of your time  - efficiently. Create customized tasks to effectively plan your day or week for maximum productivity and accomplish more everyday. 
        </p>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-bold dark:text-white pr-40 pb-4 mr-24 flex justify-end">
          Keep Yourself on Track
        </h3>
        <p className="text-white text-left tracking-tight leading-6 text-2xl pb-8 h-48 pl-70 ml-80 mr-5">
          Untangle your day and get tasks out of your head and into CheckMate quickly to stay organized and on track. The perfect tool to tame the chaos so you can focus on the right tasks at the right time. Your brain just got an upgrade  
        </p>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-bold dark:text-white pt-5 pl-30 pb-4 ml-12 flex justify-start">
          Set Your Future Self Up for a Win
        </h3>
        <p className="text-white text-left tracking-tight leading-6 text-2xl pb-4 h-48 ml-3 pr-70 mr-60">
          Accomplish big things when you do them one step at a time. CheckMate helps you keep in control of your day-to-day so you focus on the what's important now. 
        </p>
        <br></br>
        <h3 className="text-white tracking-tight text-4xl self-center font-bold dark:text-white p-8 flex justify-end">
          Bask in the glory.
        </h3>
      </div>
    </main>
  )
}
