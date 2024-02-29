export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage:
        null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '12kuasfg',
    email: 'email@gmail.com',
    displayName: 'Demo user',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAauthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}


export const demoUser = {
    uid: 'dabsuhcbga76t',
    email: 'demo@gmail.com',
    displayName: 'Demo user',
    photoURL: 'https://demo.jpg'
}