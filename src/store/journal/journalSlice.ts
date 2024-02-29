import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NotesTypes {
    id: string,
    date: number,
    body: string
    title: string
    imageUrl: string[]
}


interface JournalState {
    isSaving: boolean;
    messagedSaved: string;
    notes: NotesTypes[]; // Usa la interfaz NoteType aquí
    active: NotesTypes | null; // La nota activa puede ser un objeto NoteType o null
}

// Estado inicial basado en la interfaz JournalState
const initialState: JournalState = {
    isSaving: false,
    messagedSaved: '',
    notes: [], // Inicializa como un arreglo vacío de NoteType
    active: null, // Inicialmente no hay nota activa
};


export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true

        },
        addNewEmptyNote: (state, action: PayloadAction<NotesTypes>) => {
            state.notes.push(action.payload)
            state.isSaving = false

        },

        setActiveNote: (state, action: PayloadAction<NotesTypes>) => {
            state.active = action.payload
            state.messagedSaved = ''

        },

        setNotes: (state, action: PayloadAction<NotesTypes[]>) => {

            state.notes = action.payload

        },

        setSaving: (state) => {
            state.isSaving = true
            state.messagedSaved = ''

        },

        updatedNote: (state, action: PayloadAction<NotesTypes>) => {
            state.isSaving = false
            state.notes = state.notes.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })

            state.messagedSaved = `${action.payload.title}, actualiada correctamente`
        },

        setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
            if (state.active) {
                state.active.imageUrl = [...state.active.imageUrl, ...action.payload]
                state.isSaving = false
            }


        },
        clearNotesLogout: (state) => {
            state.isSaving = false
            state.messagedSaved = ''
            state.notes = []
            state.active = null

        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.active = null
            // //@ts-ignore
            state.notes = state.notes.filter(item => item.id !== action.payload)

        },

    }
});
// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updatedNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;