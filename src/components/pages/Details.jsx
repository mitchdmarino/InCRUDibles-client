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

  // All the profiles from App state are gathered and are rendered with a profile component.
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

  // This handles the submission of a profile creation form.
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
        // The state of the profiles are set to be the most updated version.
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

  // This page displays a form to create a new profile. 
  // Once a profile is created, it can be edited or deleted on this page.
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
              color: "#3C97EC",
            }}
            handleSubmit={handleCreateProfile}
            setProfiles={setProfiles}
            isCreate={true}
          />
        </div>
        <h2>{profileList}</h2>
        <p className="text-white tracking-tight leading-6 text-2xl h-48 pt-6">
          You are currently logged in with {currentAccount.email}.
        </p>
      </div>
    </main>
  );
}
