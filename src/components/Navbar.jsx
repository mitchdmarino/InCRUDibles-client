import { Link } from "react-router-dom";
import { Navbar as Nav, Dropdown, Avatar } from 'flowbite-react';


export default function Navbar({ currentAccount, handleLogout, currentProfile }) {
  const loggedIn = (
    <>
      {/* if the Account is logged in .. */}
      <Link
        className="hover:text-blue-500 block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-800 md:p-0 dark:text-white"
        to="/taskspage"
      >
        Tasks
      </Link>

      <Link
        className="hover:text-blue-500 block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-800 md:p-0 dark:text-white"
        to="/profileselection"
      >
        Profiles
      </Link>

      <Link
        className="hover:text-blue-500 block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-800 md:p-0 dark:text-white"
        to="/details"
      >
        Account Details
      </Link>


      <Link
        className="hover:text-blue-500 block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-800 md:p-0 dark:text-white"
        to="/"
      >
        <span onClick={handleLogout}>Logout</span>
      </Link>
    </>
  )

  const loggedOut = (
    <>
      {/* if the Account is not logged in  */}

      <Link
        className="hover:text-blue-500 font-semibold block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
        to="/register"
      >
        Register
      </Link>

      <Link
        className="hover:text-blue-500 font-semibold block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
        to="/login"
      >
        Login
      </Link>
    </>
  )

  

  return (
    <Nav fluid={true} rounded={true}>
      <Nav.Brand href="/">
        <span 
        /*className="hover:text-blue-500 self-center whitespace-nowrap text-2xl font-bold text-blue-700 p-1.5"*/
        className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-l from-purple-800 to-blue-500 self-center whitespace-nowrap p-1">
          CheckMate
        </span>
      </Nav.Brand>
      <Nav.Toggle />
      <Nav.Collapse>
        <Link
          className="hover:text-blue-500 font-semibold block py-2 pr-4 pl-3 text-white bg-blue-800 rounded md:bg-transparent md:text-blue-800 md:p-0 dark:text-white"
          to="/"
        >
          Home
        </Link>
        {currentAccount ? loggedIn : loggedOut}
        {
          currentProfile ? 
          <Link to="/profileselection" className="hover:text-blue-500 font-semibold block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white ">
          <div style={{backgroundColor:`${currentProfile.color}`}}className="text-center text-white rounded-full h-6 w-6">
            {currentProfile.name.charAt(0)}
          </div>
        </Link>: 
        ''
        }
      </Nav.Collapse>
      
    </Nav>
  )
}
