import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updatedNote, setPhotosToActiveNote, deleteNoteById } from "./"
import { fileUpload, loadNotes } from "../../helpers"

export const startNewNote = () => {

    return async (dispatch: any, getState: any) => {
        dispatch(savingNewNote())

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrl: []
        }

        // coleccion/documento/coleccion
        //${uid}/journal/notes
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        // Pide la referencia al documento donde lo quiero insertar y objeto que voy  guardar
        await setDoc(newDoc, newNote)
        // @ts-ignore
        newNote.id = newDoc.id
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch: any, getState: any) => {
        const { uid } = getState().auth
        if (!uid) throw new Error("uid doesn't exist")
        const response = await loadNotes(uid)
        dispatch(setNotes(response))

    }
}

export const startUpdatingNote = () => {
    return async (dispatch: any, getState: any) => {
        dispatch(setSaving())
        const { uid } = getState().auth
        const { active: activeNote } = getState().journal

        const noteToFireStore = { ...activeNote }
        delete noteToFireStore.id
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(updatedNote(activeNote))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch: any) => {
        dispatch(setSaving())
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        const response = await Promise.all(fileUploadPromises)
        console.log(response)
        dispatch(setPhotosToActiveNote(response))


    }
}


export const startDeletingNote = () => {
    return async (dispatch: any, getState: any) => {
        const { uid } = getState().auth
        const { active: activeNote } = getState().journal
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(activeNote.id))
    }
}