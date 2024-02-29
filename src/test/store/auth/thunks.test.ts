import { logOutApp, registerUserWithEmailPassword, signInWithGoogle, startLoginWithEmailPassword } from "../../../firebase/providers"
import { login, logout } from "../../../store/auth"
import { checkingAuhthentication, singOutApp, startGoogleSingIn, startCreatingRegister, loginWithEmailPassword } from "../../../store/auth/thunks"
import { clearNotesLogout } from "../../../store/journal";
import { demoUser } from '../../fixtures/authFixtures';

// Con esto hacemos una mock de todo el paquete
jest.mock('../../../firebase/providers')

describe('Testing the thunks at authSlice', () => {
    const dispatch = jest.fn()
    beforeEach(() => jest.clearAllMocks())

    test('Should call checkingAuhthentication', async () => {
        await checkingAuhthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith({ "payload": undefined, "type": "auth/checkingCredentials" })

    })

    test('startGoogleSingIn must call checkingAuhthentication and login', async () => {
        const loginData = {
            ok: true,
            ...demoUser,
        }

        // Como ya lo tenemos mockeado podemos simular el resultado
        await signInWithGoogle.mockResolvedValue(loginData)
        await startGoogleSingIn()(dispatch)
        expect(dispatch).toHaveBeenCalledWith({ "payload": undefined, "type": "auth/checkingCredentials" })
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startGoogleSingIn must call checkingAuhthentication and logout', async () => {
        const loginData = {
            ok: false,
            errorMessage: 'Error de Google',
        }

        // Como ya lo tenemos mockeado podemos simular el resultado
        await signInWithGoogle.mockResolvedValue(loginData)
        await startGoogleSingIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith({ "payload": undefined, "type": "auth/checkingCredentials" })
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    })

    test('loginWithEmailPassword must call checkingAuhthentication and login', async () => {
        const loginData = {
            ok: true,
            ...demoUser,
        }

        const createUser = {
            email: demoUser.email,
            password: '123456',
        }

        await startLoginWithEmailPassword.mockResolvedValue(loginData)
        await loginWithEmailPassword(createUser)(dispatch)

        expect(dispatch).toHaveBeenCalledWith({ "payload": undefined, "type": "auth/checkingCredentials" })
        expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }))
    })

    test('startCreatingRegister must call checkingAuhthentication and login', async () => {
        const loginData = {
            ok: true,
            ...demoUser
        }

        const userData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName,
        }


        await registerUserWithEmailPassword.mockResolvedValue(loginData)
        await startCreatingRegister(userData)(dispatch)
        expect(dispatch).toHaveBeenCalledWith({ "payload": undefined, "type": "auth/checkingCredentials" })
        expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }))
    })

    test('startCreatingRegister must call checkingAuhthentication and logout', async () => {
        const loginData = {
            ok: false,
            errorMessage: 'Error al crear el usuario'
        }
        const userData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName,
        }



        await registerUserWithEmailPassword.mockResolvedValue(loginData)
        await startCreatingRegister(userData)(dispatch)
        expect(dispatch).toHaveBeenCalledWith({ "payload": undefined, "type": "auth/checkingCredentials" })
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }))
    })


    test('singOutApp and clear the notes', async () => {

        // await logOutApp.mockResolvedValue()
        await singOutApp()(dispatch)
        expect(logOutApp).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout({}))


        // expect(dispatch).toHaveBeenCalledWith({ "payload": undefined, "type": "auth/checkingCredentials" })
        // expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }))
    })
})