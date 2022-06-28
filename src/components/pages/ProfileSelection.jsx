import Profile from '../Profile'



export default function ProfileSelection({profiles, setProfiles, currentProfile, setCurrentProfile}) {
  
  // profiles --- array [profile1, profile2, ...]
  const profileList = profiles.map(profile => {
    return (
      <Profile key={`profile - ${profile._id}`}setCurrentProfile={setCurrentProfile} profile={profile} setProfiles={setProfiles} showEdit={false} />
    )
  })
  return (
    
    <div className="">
      <h1 className="text-6xl">Profile selection Page</h1>
      {profileList}
    </div>
  );
}

