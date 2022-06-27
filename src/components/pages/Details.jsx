import { useState, useEffect } from "react";
import axios from "axios";
import ProfileForm from "../ProfileForm";
import Profile from '../Profile'

export default function Details({ currentAccount, handleLogout, profiles, setProfiles }) {
  // are my changes showign?
  // state for the secret message (aka Account privileged data )
  const [msg, setMsg] = useState("");

  const profileList = profiles.map(profile => {
    return (
      <Profile key={`${profile._id}`} profile={profile} setProfiles={setProfiles} />
    )
  })

  const handleCreateProfile = (e, form, setForm) => {
    e.preventDefault()
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/profile`, form ,options)
      .then(response => {
        console.log(response)
        setProfiles(response.data.profiles)
      })
    setForm({
      name: '', 
      color: 'red'
    })
  }
  

  return (
    <div>
      <h1>Hello {currentAccount.name}</h1>
      <p>Email: {currentAccount.email}</p>

      <h2>
        Here is the secret message that is only available to Accounts of Account
        App:{" "}
      </h2>

      <h3>{msg}</h3>

      <h2>Profiles</h2>
      {profileList}      

      <h3>Add a new profile</h3>
      <ProfileForm initialForm={{name: '', color:'red'}} handleSubmit={handleCreateProfile} setProfiles={setProfiles}/>
    </div>
  );
}
