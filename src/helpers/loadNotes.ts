import { collection, getDoc, getDocs } from "firebase/firestore"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async (uid: string) => {
    if (!uid) throw new Error("uid doesn't exist")

    const collectionRef = await collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const notes: any = []
    docs.forEach(document => {
        notes.push({
            id: document.id,
            ...document.data(),
        })
    })
    return notes

}