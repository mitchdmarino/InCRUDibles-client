import React from "react";
import axios from "axios";

export default function Task({ task }) {
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
        { completed: true },
        options
      )
      .then((response) => {
        console.log(response);
        // setTasks({ completed: true });
      });
  };
  return (
    <ul>
      <li>
        {task.description}{" "}
        <button onClick={handlecompletedTask}>Complete</button>
      </li>
    </ul>
  );
}
