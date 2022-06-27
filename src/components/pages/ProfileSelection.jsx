import Profile from '../Profile'

export default function ProfileSelection({profiles, setProfiles}) {
  console.log(profiles)
  // profiles --- array [profile1, profile2, ...]
  const profileList = profiles.map(profile => {
    return (
      <Profile profile={profile} setProfiles={setProfiles} showEdit={false} />
    )
  })
  return (
    
    <div className="">
      <h1 className="text-6xl">Profile selection Page</h1>
      {profileList}
    </div>
  );
}

