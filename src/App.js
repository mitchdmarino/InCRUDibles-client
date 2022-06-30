import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Welcome from "./components/pages/Welcome";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar";
import jwt_decode from "jwt-decode";
import "./App.css";
import TasksPage from "./components/pages/TasksPage";
import ProfileSelection from "./components/pages/ProfileSelection";
import Details from "./components/pages/Details";
import Error from "./components/pages/Error";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
  // The currently logged in user will be stored up here in state.
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentProfile, setCurrentProfile] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["profile"]);

  // useEffect -- If the Account navigates away from the page, we will log them back in.
  useEffect(() => {
    // The token is checked to see if it is currently in storage.
    const token = localStorage.getItem("jwt");
    if (token) {
      // If it is, we will decode it and set the Account in app state.
      const loggedInAccount = jwt_decode(token);
      setCurrentAccount(loggedInAccount);
      //  The authorization headers are created.
      const options = {
        headers: {
          Authorization: token,
        },
      };
      // The app is updated with the account's latest information.
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/account/${loggedInAccount.id}`,
          options
        )
        .then((response) => {
          // With the response from the server, the profiles and tasks are set.
          setProfiles(response.data.profiles);
          setTasks(response.data.tasks);
          // This is checking to see if there is a profile id cookie.
          if (cookies.profile) {
            // If one is found, the  current profile state is set to be the profile of the cookie.
            setCurrentProfile(
              response.data.profiles.find(
                (profile) => profile._id === cookies.profile
              )
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCurrentAccount(null);
    }
  }, []);

  // This event handler is used to log out the Account when the user has completed their session.
  const handleLogout = () => {
    // Local storage is checked for a token.
    if (localStorage.getItem("jwt")) {
      // If it exists, delete it.
      localStorage.removeItem("jwt");
      // This removes the profile cookie.
      removeCookie("profile");
      // All of the states are cleared.
      setCurrentAccount(null);
      setCurrentProfile("");
      setProfiles([]);
      setTasks([]);
    }
  };

  // The routes are conditionally rendered based on whether or not a user is logged in.
  return (
    <Router>
      <header>
        <Navbar
          currentAccount={currentAccount}
          handleLogout={handleLogout}
          currentProfile={currentProfile}
        />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Welcome
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
                setProfiles={setProfiles}
                setTasks={setTasks}
              />
            }
          />

          <Route
            path="/taskspage"
            element={
              <TasksPage
                currentAccount={currentAccount}
                tasks={tasks}
                currentProfile={currentProfile}
                profiles={profiles}
                setTasks={setTasks}
                initialForm={{ description: "", completed: false }}
              />
            }
          />
          <Route
            path="/details"
            element={
              currentAccount ? (
                <Details
                  initialForm={{ name: "", color: "" }}
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount}
                  profiles={profiles}
                  setProfiles={setProfiles}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profileselection"
            element={
              <ProfileSelection
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
                profiles={profiles}
                setProfiles={setProfiles}
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          <Route path="/notfound" element={<Error />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
