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
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
  // the currently logged in user will be stored in state
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentProfile, setCurrentProfile] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["profile"]);

  // useEffect -- if the Account navigates away from the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem("jwt");
    if (token) {
      // if so, we will decode it and set the Account in app state
      const loggedInAccount = jwt_decode(token);
      setCurrentAccount(loggedInAccount);
      console.log(loggedInAccount);

      //  make the auth headers
      const options = {
        headers: {
          Authorization: token,
        },
      };
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/account/${loggedInAccount.id}`,
          options
        )
        .then((response) => {
          setProfiles(response.data.profiles);
          setTasks(response.data.tasks);
          // check if there is a profile id cookie
          if (cookies.profile) {
            // if there is, set the current profile state to be the profile of the cookie
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
      console.log("hello");
    }
  }, []);

  // event handler to log the Account out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem("jwt")) {
      // if so, delete
      localStorage.removeItem("jwt");
      // remove the profile cookie
      removeCookie("profile");
      // clear all States 
      setCurrentAccount(null);
      setCurrentProfile('')
      setProfiles([])
      setTasks([])
    }
  };

  return (
    <Router>
      <header>
        <Navbar currentAccount={currentAccount} handleLogout={handleLogout} currentProfile={currentProfile} />
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
          {/* TODO: conditionally render auth locked routes */}

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
        </Routes>
      </main>
    </Router>
  );
}

export default App;
