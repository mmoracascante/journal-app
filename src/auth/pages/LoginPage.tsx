import { Google } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from ".."
import { useFormCustom } from "../../hooks"
import { FormEvent, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkingAuhthentication, loginWithEmailPassword, startGoogleSingIn } from "../../store/auth/thunks"
import { RootState } from "../../store"


const formValidations = {
    email: [(value: string) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value: string) => value.length >= 6, 'El password debe tener más de 6 letras'],
}


export const LoginPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false)

    const dispatch = useDispatch()
    const { status, errorMessage } = useSelector((state: RootState) => state.auth)

    const { handleOnChange, email, password, formState, isFormValid, passwordValid, emailValid, } = useFormCustom({
        email: '',
        password: '',
    }, formValidations)

    const isAuthenticated = useMemo(() => status === 'checking', [status])


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setFormSubmitted(true)
        if (!isFormValid) return
        dispatch(loginWithEmailPassword(formState))

    }


    const onGoogleSingIn = () => {
        dispatch(startGoogleSingIn())
    }



    return (
        <AuthLayout title="Login">
            <form
                className='animate__animated animate__fadeIn animate__faster'
                onSubmit={onSubmit}>
                <Grid
                    container>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            onChange={handleOnChange}
                            label='Correo'
                            type="email"
                            name="email"
                            value={email}
                            placeholder="correo@google.com"
                            fullWidth
                            error={!!emailValid && formSubmitted}
                            // @ts-ignore
                            helperText={emailValid}

                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            onChange={handleOnChange}
                            name="password"
                            label='Contraseña'
                            type="password"
                            value={password}
                            placeholder="contraseña"
                            fullWidth

                            error={!!passwordValid && formSubmitted}
                            // @ts-ignore
                            helperText={passwordValid}
                        />
                    </Grid>


                    <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 1 }}>

                        <Grid
                            item
                            xs={12}
                            // Un solo "!" es un null y un doble "!!" lo convierte en un valor booleano
                            display={!!errorMessage ? '' : 'none'}

                        >

                            <Alert severity="error">
                                {errorMessage}
                            </Alert>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticated}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >Login</Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticated}
                                onClick={onGoogleSingIn}
                                variant="contained"
                                fullWidth
                            >
                                <Google />
                                <Typography sx={{ marginLeft: 1 }}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to='/auth/register'>
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>

    )
}
