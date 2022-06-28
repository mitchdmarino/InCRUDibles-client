import React from "react";
import axios from "axios";

export default function Task({ task, currentProfile }) {
  const handlecompletedTask = (e) => {
    console.log(currentProfile);
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
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/${task._id}/profile/${currentProfile._id}`,
      options
    );
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
