import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import './UserProfile.css'

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!data.Nome || !data.Telefone || !data.CPF || !data.RG) {
      alert('Preencha todos os campos.');
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(
        auth, data.email, data.password
      )
      await addDoc(collection(db, "usuariodados", res.user.uid), {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    handleAdd(e);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setData({
      Nome: '',
      Telefone: '',
      CPF: '',
      RG: '',
    });
  };

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

return (
    <div className="user-profile">
      <TextField
        require
        className="user-profile__input"
        type="text"
        label="Nome"
        name="Nome"
        value={data.Nome}
        disabled={!isEditing}
        onChange={handleChange}
      />
      <TextField
        require
        className="user-profile__input"
        type="number"
        label="Celular"
        name="Telefone"
        value={data.Telefone}
        disabled={!isEditing}
        onChange={handleChange}
      />
      <TextField
        require
        className="user-profile__input"
        type="text"
        label="CPF"
        name="CPF"
        value={data.CPF}
        disabled={!isEditing}
        onChange={handleChange}
      />
      <TextField
        require
        className="user-profile__input"
        type="number"
        label="RG"
        name="RG"
        value={data.RG}
        disabled={!isEditing}
        onChange={handleChange}
      />
      <div className="user-profile__button-container">
        {isEditing ? (
          <>
            <Button
              className="user-profile__button"
              type="submit"
              variant="outlined"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className="user-profile__button"
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            className="user-profile__button"
            variant="outlined"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 