import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const UserProfile = ({ user }) => {
  const [userData, setUserData] = useState(user.data());

  const handleNameChange = (event) => {
    setUserData({ ...userData, name: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUserData({ ...userData, password: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setUserData({ ...userData, phone: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  const handleCpfChange = (event) => {
    setUserData({ ...userData, cpf: event.target.value });
  };

  const handleSubmit = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update(userData)
      .then(() => {
        console.log("User data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
      });
  };

  return (
    <div>
      <TextField
        label="Name"
        value={userData.name}
        onChange={handleNameChange}
      />
      <TextField
        label="Password"
        value={userData.password}
        type="password"
        onChange={handlePasswordChange}
      />
      <TextField
        label="Phone"
        value={userData.phone}
        onChange={handlePhoneChange}
      />
      <TextField
        label="Email"
        value={userData.email}
        onChange={handleEmailChange}
      />
      <TextField label="CPF" value={userData.cpf} onChange={handleCpfChange} />
      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>User Profile</h1>
          <UserProfile user={user} />
        </div>
      ) : (
        <div>
          <h1>Please sign in to view your profile.</h1>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
