import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../../store/auth"
import { signOut } from "firebase/auth"
import { singOutApp } from "../../store/auth/thunks"


interface Props {
    drawerWidth: number
}

export const Navbar = ({ drawerWidth = 240 }: Props) => {
    const dispatch = useDispatch()

    const onLogout = () => {
        return dispatch(singOutApp())
    }


    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth})px` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >

            <Toolbar>
                <IconButton
                    color="inherit"
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h6" noWrap component='div'>Journal APP</Typography>
                    <IconButton
                        onClick={() => onLogout()}
                        color="error">
                        <LogoutOutlined />
                    </IconButton>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}
