import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from 'react'
import { useEffect } from "react";

export default function Task({ task, currentProfile, profiles, setTasks }) {
  
  const [profileColor, setProfileColor] = useState('white')
  
  useEffect(() => {
    if (task.profile) {
      console.log(task.profile.color)
      setProfileColor(task.profile.color)
    }
    console.log(task)
  }, [])


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
        
        // setTasks({ completed: true });
      });
    //
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/tasks/${task._id}/profile/${currentProfile._id}`,
        {},
        options
      )
      .then((response) => {
       
      });
    const loggedInAccount = jwt_decode(token);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/account/${loggedInAccount.id}`,
        options
      )
      .then((response) => {
        console.log(response, 'HELLLOOOOOO')
        setTasks(response.data.tasks);
      })
      ;
    setProfileColor(currentProfile.color)
  };

  const color = task.completed ? "green" : "black";
  // let bGColor = "";
  // if (task.profile) {
  //   if (task.profile.color) {
  //     bGColor = task.profile.color
  //     // console.log(bGColor)
      
  //     // const colorProfile = profiles.find(
  //     //   (profile) => profile._id === task.profile
  //     // );
  //     // // console.log(colorProfile.color);
  //     // // console.log(task.profile);
  //     // // console.log(profiles);
  //     // if (colorProfile) {
  //     //   bGColor = colorProfile.color;
  //     // }
      
  //     // console.log(bGColor, "inside");
  //   }
  // }
  // console.log(bGColor, "outside");
  return (
    <ul>
      <li style={{ color: color, backgroundColor: profileColor }}>
        {task.description}{" "}
        <button onClick={handlecompletedTask}>Complete</button>
      </li>
    </ul>
  );
}
