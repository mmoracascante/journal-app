import { Grid, TextField, Button, Typography, Link, Alert } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from ".."
import { useFormCustom } from "../../hooks"
import { FormEvent, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingRegister } from "../../store/auth/thunks"
import { RootState } from "../../store"


const initialValues = {
    email: '',
    password: '',
    displayName: '',
}

const formValidations = {
    email: [(value: string) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value: string) => value.length >= 6, 'El password debe tener más de 6 letras'],
    displayName: [(value: string) => value.length >= 1, 'El nombre es obligatorio'],
}


export const RegisterPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false)
    const dispatch = useDispatch()
    const { status, errorMessage } = useSelector((state: RootState) => state.auth)
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])


    const { email, password, displayName, isFormValid, handleOnChange, displayNameValid, passwordValid, emailValid, formState } = useFormCustom(initialValues, formValidations)

    console.log(displayNameValid)


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setFormSubmitted(true)
        if (!isFormValid) return
        // @ts-ignore
        dispatch(startCreatingRegister(formState))
    }


    return (
        <AuthLayout title="Crear cuenta">
            <form
                className='animate__animated animate__fadeIn animate__faster'
                onSubmit={onSubmit}>
                <Grid

                    container>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            onChange={handleOnChange}
                            name='displayName'
                            value={displayName}
                            label='Nombre completo'
                            type="text"
                            placeholder="nombre y apellidos"
                            fullWidth
                            error={!!displayNameValid && formSubmitted}
                            // @ts-ignore
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            onChange={handleOnChange}
                            name='email'
                            value={email}
                            label='Correo'
                            type="email"
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
                            name='password'
                            value={password}
                            label='Contraseña'
                            type="password"
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

                        <Grid item xs={12}>
                            <Button
                                disabled={isCheckingAuthentication}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >Crear cuenta</Button>
                        </Grid>



                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ marginRight: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}

