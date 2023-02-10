import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
import App from "/src/routes/routes.js"
import { Button } from "@mui/material"; 

const provider = new GoogleAuthProvider();

export const Login = ()=>{

    const auth = getAuth(App);
    const singInGoogle = ()=>{
        
        signInWithPopup(auth, provider)
        .then((result) => {
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
      
            const user = result.user;
            console.log(user);

        }).catch((error) => {
  
            const errorCode = error.code;
            const errorMessage = error.message;
       
            const email = error.customData.email;

            const credential = GoogleAuthProvider.credentialFromError(error);
  });
    }
    return (
        <Button onClick={singInGoogle}>Sign In</Button>
    )
}