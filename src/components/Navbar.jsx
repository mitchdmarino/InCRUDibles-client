import { Link } from "react-router-dom";

export default function Navbar({ currentAccount, handleLogout }) {
  const loggedIn = (
    <>
      {/* if the Account is logged in .. */}
      <Link to="/">
        <span onClick={handleLogout}>Logout</span>
      </Link>
      {" | "}
      <Link to="/profileselection">Profile Selection</Link>
      {" | "}
      <Link to="/details">Account Details</Link>
      {" | "}
      <Link to="/taskspage">Tasks</Link>
    </>
  );

  const loggedOut = (
    <>
      {/* if the Account is not logged in  */}
      <Link to="/register">Register</Link>
      {" | "}
      <Link to="/login">Login</Link>
    </>
  );
  return (
    <nav>
      {/* Account always sees this section */}
      <Link to="/">
        <p>Account App</p>
      </Link>
      {currentAccount ? loggedIn : loggedOut}
    </nav>
  );
}
