import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { useFormCustom } from "../../hooks"
import { ChangeEvent, useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeletingNote, startUpdatingNote, startUploadingFiles } from "../../store/journal"
import Swal from 'sweetalert2'


export const NoteView = () => {
    const dispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const { active: noteActive, messagedSaved, isSaving } = useSelector((state: RootState) => state.journal)
    const initialNoteForm = noteActive || { title: '', body: '', date: '' };

    const { body, title, date, handleOnChange, formState } = useFormCustom(initialNoteForm)

    const showDate = useMemo(() => {
        const newDate = new Date(date)

        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState))

    }, [formState])

    useEffect(() => {
        if (messagedSaved !== '') {
            Swal.fire({
                title: 'Nota actualizada',
                text: 'Se ha realizado la actualización de la nota',
                icon: 'success',
                confirmButtonText: 'Cerrar',
            })
        }

    }, [messagedSaved])


    const onSaveNote = () => {
        dispatch(startUpdatingNote())
    }

    const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.files?.length === 0) return

        dispatch(startUploadingFiles(target.files))


    }


    const onClickButton = () => {
        inputRef.current?.click()
    }


    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{
                marginBottom: 5,

            }}
        >
            <Grid item>
                <Typography fontSize={26} fontWeight='light'>{showDate}</Typography>
            </Grid>

            <Grid item>
                <input
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={onFileInputChange}
                    multiple
                    type="file"
                />
                <IconButton
                    // Usamos una referencia (useRef) del input para hacer el evento click (onClickButton)
                    // y así subir los archivos
                    onClick={onClickButton}
                    color="primary"
                    disabled={isSaving}
                >
                    <UploadFileOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    type="button"
                    onClick={onSaveNote}
                    color="primary" sx={{ p: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>

                <TextField
                    onChange={handleOnChange}
                    name="title"
                    value={title}
                    label='Título'
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingresa un título"
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    onChange={handleOnChange}
                    name="body"
                    value={body}
                    minRows={5}
                    type="text"
                    variant="filled"
                    multiline
                    fullWidth
                    placeholder="Qué sucedió hoy?"
                    sx={{ border: 'none', mb: 1 }}
                />

            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar

                </Button>

            </Grid>


            <ImageGallery images={noteActive && noteActive.imageUrl} />

        </Grid>
    )
}
