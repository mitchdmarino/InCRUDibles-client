import ProfileForm from "./ProfileForm";
import axios from "axios";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Profile ({profile, setProfiles, showEdit , setCurrentProfile }) {
  let navigate = useNavigate()
  // showForm decides whether or not to display an Edit form based on button click.
  const [showForm, setShowForm] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['profile'])

  // A profile is edited once an edit form is submitted.
  const handleEditProfile = (e, form, setForm) => {
    e.preventDefault()
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    }
    axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/profile/${profile._id}`, form ,options)
      .then(response => {
        setProfiles(response.data.profiles)
      })
      .catch(err=> {
        console.log(err)
      })
      setShowForm(false)
  }

  // A profile is deleted once the delete button is clicked. 
  const handleDeleteProfile = () => {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    }
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/profile/${profile._id}`, options)
      .then(response => {
        console.log(response)
        setProfiles(response.data.profiles)
      })
      .catch(err => {
        console.log(err)
      })
      
    
  }

  // When a user selects a profile, the current profile state is set and a cookie is added.
  const handleProfileSelect = (selectedProfile) => {
    setCurrentProfile(selectedProfile)
    setCookie('profile', selectedProfile._id)
    navigate("/taskspage", { replace: true })

  } 
  const handleNothing = () => {
    
  }

  // This ternary operator determines the styling for both the profile selection page and the account details page.
  const styling = showEdit
    ? `z-0 text-white pt-14 text-3xl font-semibold rounded-full w-[180px] h-[180px] mx-auto shadow-lg shadow-indigo-500/40 m-20 border-4 border-white`
    : `z-0 text-white pt-14 text-3xl font-semibold rounded-full w-[180px] h-[180px] mx-auto shadow-lg shadow-indigo-500/40 m-20 over:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out border-4 border-white`

    return (
      <div
        onClick={showEdit ? handleNothing : () => handleProfileSelect(profile)}
        style={{ backgroundColor: `${profile.color}` }}
        className={styling}
      >
        <h3 className="pt-3">{profile.name}</h3>

        <div className="text-[16px] flex justify-center text-blue-500 mt-10">
          {showForm ? (
            <div className="mt-2">
            <ProfileForm
              key={`editProfileForm-${profile._id}`}
              initialForm={{
                name: profile.name,
                color: profile.color,
              }}
              handleSubmit={handleEditProfile}
              isCreate={false}
            />
            </div>
          ) : (
            ""
          )}
          {showEdit ? (
            <div className="edit-container flex justify-center">
              
              {
                showForm ? 
                <button className="rounded-full font-semibold bg-white hover:bg-blue-700 hover:text-white h-10 w-[80px] mt-2"
                onClick={() => setShowForm(!showForm)}>
                  Cancel
                </button>: 
                <button className="rounded-full font-semibold bg-white hover:bg-blue-700 hover:text-white h-10 w-[80px] mt-2"
                onClick={() => setShowForm(!showForm)}>
                  Edit
                </button>
              }
              
              {showForm ? (
                <button
                  className="rounded-full font-semibold bg-white hover:bg-blue-700 hover:text-white  h-10 w-[80px] mt-2"
                  onClick={handleDeleteProfile}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    )
}

