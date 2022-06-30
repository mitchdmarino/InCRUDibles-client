import Profile from "../Profile";

export default function ProfileSelection({
  profiles,
  setProfiles,
  currentProfile,
  setCurrentProfile,
}) {
  // profiles --- array [profile1, profile2, ...]
  // show a list of all profiles. showEdit prop will be false because 
  // we don't want the edit option on this page, only on the account details page.
  const profileList = profiles.map((profile) => {
    return (
      <Profile
        key={`profile - ${profile._id}`}
        setCurrentProfile={setCurrentProfile}
        profile={profile}
        setProfiles={setProfiles}
        showEdit={false}
      />
    );
  });
  return (
    <div className="">
      <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white pt-20">
        Choose Your Profile
      </h1>
      <h2 className="flex flex-wrap">{profileList}</h2>
    </div>
  );
}
