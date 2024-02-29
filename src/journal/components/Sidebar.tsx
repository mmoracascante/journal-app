import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { SidebarItem } from "./"

interface Props {
    drawerWidth: number
}


export const Sidebar = ({ drawerWidth }: Props) => {
    const { displayName } = useSelector((state: RootState) => state.auth)
    const { notes } = useSelector((state: RootState) => state.journal)


    return (
        <Box
            component='nav'
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
            }}
        >
            <Drawer
                variant="permanent" // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>{displayName}</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map((item: any) => (
                            <SidebarItem key={item.id} {...item} />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
