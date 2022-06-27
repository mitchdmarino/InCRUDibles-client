import { useState, useEffect } from "react";
import axios from "axios";
import ProfileForm from "../ProfileForm";

export default function Details({ currentAccount, handleLogout, initialForm }) {
  // state for the secret message (aka Account privileged data )
  const [msg, setMsg] = useState("");
  // useEffect for getting the Account data and checking auth
  useEffect(() => {
    const getMessage = async () => {
      try {
        // get the token from local storage
        const token = localStorage.getItem("jwt");
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        };
        // hit the auth locked endpoint
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/account/auth-locked`,
          options
        );
        // set the secret Account message in state
        setMsg(response.data.msg);
      } catch (err) {
        // if the error is 401, the auth failed
        console.warn(err);
        if (err.response) {
          if (err.response.status === 401) {
            handleLogout();
          }
        }
      }
    };
    getMessage();
  });
  // const handleEdit = (e, form, setForm) => {
  //   e.preventDefault();
  //   axios
  //     .post(`${process.env.REACT_APP_SERVER_URL}/api-v1/profile`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setBounty(response.data); // addd updated bounty to state
  //       setShowForm(false); // hide form
  //     })
  //     .catch(console.warn);
  // };
  // const handleCreate = async (e, form, setForm) => {
  //   e.preventDefault();
  //   // axios to POST a new bounty
  //   console.log("the form data is:", form);
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_SERVER_URL}/api-v1/profile`,
  //       form
  //     );

  //     setBounties([...bounties, response.data]);

  //     setForm({
  //       name: "",
  //       color: "",
  //     });
  //     setErr("");
  //   } catch (err) {
  //     console.warn("submit error:", err);
  //     if (err.response) {
  //       if (err.response.status === 400) {
  //         // this error is a validation error from our backend
  //         setErr(err.response.data.msg);
  //       }
  //     }
  //   }
  // };

  return (
    <div>
      <h1>Hello {currentAccount.name}</h1>
      <p>Email: {currentAccount.email}</p>

      <h2>
        Here is the secret message that is only available to Accounts of Account
        App:{" "}
      </h2>

  <h3>{msg}</h3>

  <h3>Add a new profile</h3>
  <ProfileForm/>
    </div>
  );
}
