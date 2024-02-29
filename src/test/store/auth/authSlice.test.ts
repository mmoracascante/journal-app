import { authSlice, checkingCredentials, login, logout } from "../../../store/auth"
import { initialState, authenticatedState, demoUser, notAauthenticatedState } from "../../fixtures/authFixtures"

describe('Testing authSlice', () => {
    test('Should return initialState y llamar auth', () => {

        const state = authSlice.reducer(initialState, {})

        expect(authSlice.name).toBe('auth')
        expect(state).toEqual(initialState)
    })

    test('Must perform the authentication', () => {

        const state = authSlice.reducer(initialState, login(demoUser))
        // console.log(state)
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })

    })

    test('Must perform  the logout without arguments', () => {

        const state = authSlice.reducer(authenticatedState, logout(null))

        expect(state).toEqual(
            {
                status: 'not-authenticated',
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: undefined
            }
        )

    })

    test('Must perform  the logout with arguments', () => {

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage: 'User not-authenticated' }))

        expect(state).toEqual(
            {
                status: 'not-authenticated',
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: 'User not-authenticated'
            }
        )

    })

    test('Must change the status to checking', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials())

        expect(state.status).toBe('checking')



    })
})