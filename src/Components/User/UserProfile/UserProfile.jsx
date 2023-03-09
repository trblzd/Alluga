import React, { useState,useEffect, useContext } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { doc, setDoc, getDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import './UserProfile.css'
import { AuthContext } from '../../../context/AuthContext'

const UserProfile = () => {
  const {currentUser} = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] =  useState(false);
  
  const toggleModal = ()=>{
    setModal(!modal);
  } 
  
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
      <Typography class='headerup'> Seus Dados: </Typography>
      <Button type='text' class="btn-modal" onClick={toggleModal} >
            Termos de uso
          </Button>
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

      <br/>
        
      <div className="user-profile_button-container">
      {isEditing ? (
        <>
            <Button
              className="user-profile_button"
              type="submit"
              variant="outlined"
              onClick={handleSave}
            >
            Salvar
          </Button>
            <Button
              className="user-profile_button"
              id="cancel"
              variant="outlined"
              onClick={handleCancel}
            >
            Cancelar
          </Button>
        
 
          
        </>
      ) : (
          <Button
            className="user-profile_button"
            variant="outlined"
            onClick={handleEdit}
          >
          Editar
        </Button>
        
      )}
      </div>

      
          {modal && (
            <div class="modal" onClick={toggleModal}>
              <div class="overlay" onClick={toggleModal} ></div>
              <div class="modal-content" >
                <p>Seus dados serão utilizados para manter a sua e a nossa segurança durante todo o processo de locação, eles não serão, em hipotese alguma, compartilhados com terceiros, e caso houver atraso não justificado na devolução de produtos, serão utilizados para entrar em contato, obrigado pela compreensão!</p>
              </div>
            </div>
          )}
    </div>
  );
};

export default UserProfile;