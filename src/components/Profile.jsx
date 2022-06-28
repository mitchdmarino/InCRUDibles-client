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
        <div onClick={showEdit ? handleNothing : () => handleProfileSelect(profile)}
          style={{backgroundColor: `${profile.color}`}} className={`border-solid border-black border-4  w-[200px] mx-auto m-10 p-2 `}>
        
        <h3>{profile.name}</h3>
        <p>color: {profile.color}</p>
        {
          showEdit ? 
          <div className="edit-container">
          <button 
                  onClick={()=> setShowForm(!showForm)}
              >
                  {showForm ? 'Cancel': 'Edit'}
          </button>
        
          {
            showForm ? 
            <ProfileForm key={`editProfileForm-${profile._id}`} initialForm={{name:profile.name, color: profile.color}} handleSubmit={handleEditProfile}/>:
            ''
          }
          {
            showForm ?
            <button onClick={handleDeleteProfile}>Delete</button>: ''
          }
        </div> : 
        ''
        }
        
      </div>
    )
}

