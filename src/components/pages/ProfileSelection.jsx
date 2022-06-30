import Profile from "../Profile";

export default function ProfileSelection({
  profiles,
  setProfiles,
  currentProfile,
  setCurrentProfile,
}) {
  // Profiles --- array [profile1, profile2, ...]
  // showEdit prop is false, however, when this component is rendered on the details page, the prop is true.
  const profileList = profiles.map((profile) => {
    return (
      <Profile
        key={`profile - ${profile._id}`}
        setCurrentProfile={setCurrentProfile}
        profile={profile}
        setProfiles={setProfiles}
        showEdit={false}
      />
    )
  })
  // A list of all profiles are shown on this page.
  // This is where the user can access their personal profle
  return (
    <div className="">
      <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white pt-20">
        Choose Your Profile
      </h1>
      <h2 className="flex flex-wrap">{profileList}</h2>
    </div>
  )
}
