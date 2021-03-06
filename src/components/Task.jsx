import React from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useState } from "react"
import { useEffect } from "react"

export default function Task({ task, currentProfile, profiles, setTasks }) {
  const [profileColor, setProfileColor] = useState("");

  useEffect(() => {
    if (task.profile) {
      setProfileColor(task.profile.color);
    }
  }, []);

  const handlecompletedTask = (e) => {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/tasks/${task._id}`,
        { completed: true, profile: currentProfile._id },
        options
      )
      .then((response) => {
        // setTasks({ completed: true });
      })

    const loggedInAccount = jwt_decode(token)
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/account/${loggedInAccount.id}`,
        options
      )
      .then((response) => {
        setTasks(response.data.tasks);
      });
    setProfileColor(currentProfile.color);
  };

  const handleDeleteTask = () => {
    console.log(`delete this task ${task.description}`);
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/tasks/${task._id}`,
        options
      )
      .then(console.log);
    const loggedInAccount = jwt_decode(token);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/account/${loggedInAccount.id}`,
        options
      )
      .then((response) => {
        setTasks(response.data.tasks)
      })
  }

  return (
    <>
      <td>
        <button
          className="over:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out mt-3"
          onClick={handlecompletedTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ backgroundColor: profileColor }}
            className="h-8 w-8 rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              className="text-white"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>

      <td>{task.description}</td>

      <td>
        <button
          className="over:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out p-6"
          onClick={handleDeleteTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              className="text-white"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </>
  );
}
