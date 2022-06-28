import ProfileForm from "./ProfileForm";
import axios from "axios";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Profile ({profile, setProfiles, showEdit , setCurrentProfile }) {
  let navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [showEditDiv, setShowEditDiv] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['profile'])

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
        console.log(response)
        setProfiles(response.data.profiles)
      })
  }

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
      
    
  }
  // when user selects a profile, set the current Profile state and add a cookie 
  const handleProfileSelect = (selectedProfile) => {
    setCurrentProfile(selectedProfile)
    setCookie('profile', selectedProfile._id)
    navigate("/taskspage", { replace: true })

  } 
  const handleNothing = () => {
    console.log('nothing')
  }

    return (
   
      
          <div
            onClick={
              showEdit ? handleNothing : () => handleProfileSelect(profile)
            }
            style={{ backgroundColor: `${profile.color}` }}
            className={`z-0 text-blue-500 pt-14 text-4xl font-semibold rounded-full w-[160px] h-[160px] mx-auto shadow-lg shadow-indigo-500/40 p-10 m-10`}
          >
            <h3>{profile.name}</h3>
            {/* <p>{profile.color}</p> */}
          
    
          <div className="bg-white text-[16px] flex justify-center text-blue-500 hover:bg-blue-500 hover:text-white rounded-full font-semibold shadow-lg shadow-indigo-500/40 mt-10">
              
            {showEdit ? (
              <div className="edit-container flex justify-center">
                <button onClick={() => setShowForm(!showForm)}>
                  {showForm ? "Cancel" : "Edit"}
                </button>
            
                  
                    {showForm ? (
                      <ProfileForm
                        key={`editProfileForm-${profile._id}`}
                        initialForm={{
                          name: profile.name,
                          color: profile.color,
                        }}
                        handleSubmit={handleEditProfile}
                      />
                     
                    
                    ) : (
                      ""
                    )}
                  
                    {showForm ? (
                        <button onClick={handleDeleteProfile}>Delete</button>
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

