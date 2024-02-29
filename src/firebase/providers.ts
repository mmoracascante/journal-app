import { AuthError, GoogleAuthProvider, signInWithPopup, AuthErrorMap, createUserWithEmailAndPassword, Auth, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result
        const { displayName, email, photoURL, uid } = result.user
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        }




    } catch (error: any) {
        // const errorCode = error.code;
        const errorMessage = error.message

        return {
            ok: false,
            errorMessage,
        }
    }

}


interface Props {
    email: string
    password: string
}



export const registerUserWithEmailPassword = async ({ email, password }: Props) => {
    try {


        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, email: userEmail, displayName } = response.user

        if (!FirebaseAuth.currentUser) {
            throw new Error("No hay un usuario actualmente autenticado.");
        }

        // FirebaseAuth.currentUser esto es para saber cuál es el usuario actual
        await updateProfile(FirebaseAuth.currentUser, {
            displayName,
        })

        return {
            ok: true,
            uid,
            photoURL,
            email: userEmail,
            displayName,
        }

    } catch (error: any) {
        const errorMessage = error.message
        return {
            ok: false,
            errorMessage,
        }
    }
}


interface LoginWithEmailPasswordTypes {
    email: string
    password: string
}


export const startLoginWithEmailPassword = async ({ email, password }: LoginWithEmailPasswordTypes) => {

    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, displayName, photoURL } = response.user

        return {
            ok: true,
            uid,
            displayName,
            photoURL
        }

    } catch (error: any) {
        const errorMessage = error.message
        return {
            ok: false,
            errorMessage,
        }
    }
}


export const logOutApp = async () => {

    return await FirebaseAuth.signOut()
}