import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import './UserProfile.css'

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    Nome: '',
    Telefone: '',
    CPF: '',
    RG: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!data.Nome || !data.Telefone || !data.CPF || !data.RG) {
      alert('Preencha todos os campos.');
      return;
    }
    try {
      await addDoc(collection(db, "usuariodados"), {
        ...data,
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
        className="user-profile__input"
        type="text"
        label="Nome"
        name="Nome"
        value={data.Nome}
        disabled={!isEditing}
        onChange={handleChange}
      />
      <TextField
        className="user-profile__input"
        type="number"
        label="Celular"
        name="Telefone"
        value={data.Telefone}
        disabled={!isEditing}
        onChange={handleChange}
      />
      <TextField
        className="user-profile__input"
        type="text"
        label="CPF"
        name="CPF"
        value={data.CPF}
        disabled={!isEditing}
        onChange={handleChange}
      />
      <TextField
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