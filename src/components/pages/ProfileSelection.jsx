import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileSelection({ currentAccount, handleLogout }) {
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

  return (
    <div>
      <h1>Hello {currentAccount.name}</h1>

      <p>Email: {currentAccount.email}</p>

      <h2>
        Here is the secret message that is only available to Accounts of Account
        App:{" "}
      </h2>

      <h3>{msg}</h3>
    </div>
  );
}
