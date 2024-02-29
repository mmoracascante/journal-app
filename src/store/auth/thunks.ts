import { signInWithEmailAndPassword } from "firebase/auth"
import { logOutApp, registerUserWithEmailPassword, signInWithGoogle, startLoginWithEmailPassword } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./"
import { FirebaseAuth } from "../../firebase/config"
import { clearNotesLogout } from "../journal"

export const checkingAuhthentication = () => {

    return async (dispatch: any) => {
        dispatch(checkingCredentials())
    }

}


export const startGoogleSingIn = () => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}

interface CreatingRegisterEmailPasswordTypes {
    email: string
    password: string
    displayName: string
}

export const startCreatingRegister = ({ email, password, displayName }: CreatingRegisterEmailPasswordTypes) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, displayName, email, photoURL }))

    }
}


interface LoginWithEmailPasswordTypes {
    email: string
    password: string
}

export const loginWithEmailPassword = ({ email, password }: LoginWithEmailPasswordTypes) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, displayName, errorMessage } = await startLoginWithEmailPassword({ email, password })
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, displayName, email, photoURL }))
    }
}



export const singOutApp = () => {
    return async (dispatch: any) => {
        await logOutApp()
        dispatch(clearNotesLogout())
        dispatch(logout({}))


    }
}