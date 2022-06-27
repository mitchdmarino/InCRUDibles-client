import ProfileForm from "./ProfileForm";
import axios from "axios";

export default function Profile ({profile, setProfiles}) {

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
    return (
        <div className="border-solid border-black border-4">
        <h3>{profile.name}</h3>
        <p>color: {profile.color}</p>
        <ProfileForm key={`editProfileForm-${profile._id}`} initialForm={{name:profile.name, color: profile.color}} handleSubmit={handleEditProfile}/>
        <button onClick={handleDeleteProfile}>Delete</button>
      </div>
    )
}