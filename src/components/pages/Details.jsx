import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../Profile";
import ProfileForm from "../ProfileForm";


export default function Details({ currentAccount, handleLogout, profiles, setProfiles }) {
  // are my changes showign?
  // state for the secret message (aka Account privileged data )
  const [msg, setMsg] = useState("");

  const profileList = profiles.map(profile => {
    return (
      <Profile key={`${profile._id}`} profile={profile} setProfiles={setProfiles} showEdit={true} />
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
    <main className="bg-cover bg-gradient-to-r from-cyan-500 to-blue-500">
      <div>
        <div className="flex justify-between">
          <div className="text-white tracking-tight leading-6 text-2xl pb-8 h-24 pt-10 flex justify-start pl-8">
            Your Dashboard
          </div>
          <h2 className="text-white tracking-tight leading-6 text-2xl pb-8 h-24 pt-10 flex justify-end pr-8">
            {currentAccount.name}
          </h2>
        </div>

        <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white p-8">
          User Profiles
        </h1>

        <h3 className="text-white tracking-tight leading-6 text-2xl pt-16 h-18 pb-10">
          Create a new profile and choose your icon.
        </h3>
      
        <br></br>
        <div className="">
          <ProfileForm
            initialForm={{ name: "", color: "red" }}
            handleSubmit={handleCreateProfile}
            setProfiles={setProfiles}
          />
        </div>
        <h2>{profileList}</h2>
        <h3>{msg}</h3>
        <p className="text-white tracking-tight leading-6 text-2xl pb-8 h-48 px-80 pt-80">
          You are currently logged in with {currentAccount.email}.
        </p>

        <h1 className="p-10"></h1>
      </div>
    </main>
  )
}
