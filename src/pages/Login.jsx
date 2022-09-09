import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import jwt_decode from "jwt-decode";
function Login() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log(" Encoded JWT ID token : " + response.credential);
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
  setUser({});
  document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "495034895553-u71f6niq96hkqpalje9n8do0sekfp6hd.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);
  return (
    <div className="App">
      <div>
        <form>
          <input type="text" placeholder="name"></input>
        </form>
      </div>
      <div id="signInDiv"></div>
        <NavBar/>
    </div>
  );
}

export default Login;
