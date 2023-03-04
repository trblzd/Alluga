import React, { useState,useEffect, useContext } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { doc, setDoc, getDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import './UserProfile.css'
import { AuthContext } from '../../context/AuthContext'

const UserProfile = () => {
  const {currentUser} = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const getDocData = async () => {
      const docRef = doc(collection(db, "usuariodados"), currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        setData({
          Nome: docData.Nome || '',
          Telefone: docData.Telefone || '',
          CPF: docData.CPF || '',
          RG: docData.RG || '',
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getDocData();
  }, [currentUser]);
  
  

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
      await setDoc(doc(collection(db, "usuariodados"), currentUser.uid), {
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

  const handleCancel = (e) => {
    setIsEditing(false);
    setData({
      Nome: data.Nome,
      Telefone: data.Telefone ,
      CPF: data.CPF,
      RG: data.RG 
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
      <Typography> Seus Dados: </Typography>
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