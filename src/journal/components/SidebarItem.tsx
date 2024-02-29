import { TurnedInNot } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal"



interface Props {
  date: string,
  id: string,
  body: string
  title: string
  imageUrl: []

}

export const SidebarItem = ({ date, body, id, title, imageUrl }: Props) => {

  const dispatch = useDispatch()

  const onSetActive = () => {
    const activeNote = {
      date,
      body,
      title,
      id,
      imageUrl
    }
    dispatch(setActiveNote(activeNote))
  }


  const newTitle = useMemo(() => title.length > 16 ? title.substring(0, 17) + '...' : title, [title])

  return (
    <>

      <ListItem disablePadding>
        <ListItemButton
          onClick={onSetActive}
        >
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={newTitle} />
            <ListItemText secondary={body} />

          </Grid>
        </ListItemButton>
      </ListItem>

    </>
  )
}
