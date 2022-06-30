import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../Profile";
import ProfileForm from "../ProfileForm";
import Date from "../Date";
import { useNavigate } from "react-router-dom";

export default function Details({
  currentAccount,
  handleLogout,
  profiles,
  setProfiles,
}) {
  let navigate = useNavigate();

  // get all the profiles from App state and render a profile component for them
  const profileList = profiles.map((profile) => {
    return (
      <Profile
        key={`${profile._id}`}
        profile={profile}
        setProfiles={setProfiles}
        showEdit={true}
      />
    );
  });

  // handle the submission of create Profile form
  const handleCreateProfile = (e, form, setForm) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api-v1/profile`, form, options)
      .then((response) => {
        console.log(response);
        // set the state of profiles to be the most updated version (including new profile)
        setProfiles(response.data.profiles);
      })
      .catch((err) => {
        console.log(err);
        navigate("/notfound", { replace: true });
      });
    setForm({
      name: "",
      color: "#FF0000",
    });
  };

  return (
    <main>
      <div>
        <div className="flex justify-between">
          <div className="text-white tracking-tight leading-6 text-2xl pb-8 h-20 pt-10 flex justify-start pl-8">
            {currentAccount.name}'s Dashboard
          </div>
          <h2 className="text-white tracking-tight leading-6 text-2xl pb-8 h-20 pt-10 flex justify-end pr-8">
            <Date />
          </h2>
          {/* {currentAccount.name} */}
        </div>

        <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white p-6">
          User Profiles
        </h1>

        <h3 className="text-white tracking-tight leading-6 text-2xl h-24 pb-10">
          Create a new profile and choose your color icon.
        </h3>

        <div className="">
          <ProfileForm
            initialForm={{
              name: "",
              color: "#FF0000",
            }}
            handleSubmit={handleCreateProfile}
            setProfiles={setProfiles}
            isCreate={true}
          />
        </div>
        <h2>{profileList}</h2>
        <p className="text-white tracking-tight leading-6 text-2xl pb-8 h-48 px-80 pt-80">
          You are currently logged in with {currentAccount.email}.
        </p>

        <h1 className="p-10"></h1>
      </div>
    </main>
  );
}
