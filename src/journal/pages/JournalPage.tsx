import { IconButton, Typography } from "@mui/material"
import { JournalLayout, NothingSelectView, NoteView } from ".."
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"
import { RootState } from "../../store"



export const JournalPage = () => {

    const { isSaving, active } = useSelector((state: RootState) => state.journal)

    const dispatch = useDispatch()

    const onClickNewNote = () => {
        dispatch(startNewNote())

    }


    return (
        <JournalLayout>

            {
                !!active
                    ? (<NoteView />)
                    : (<NothingSelectView />)
            }



            <IconButton
                disabled={isSaving}
                onClick={onClickNewNote}
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}

            >

                <AddOutlined
                    sx={{ fontSize: 30 }}
                />

            </IconButton>
        </JournalLayout>
    )
}
