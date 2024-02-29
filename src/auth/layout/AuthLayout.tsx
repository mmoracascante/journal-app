import { Grid, Typography } from '@mui/material'
import { ReactNode } from 'react'


interface Props {
    title: string
    children: ReactNode
}

export const AuthLayout = ({ title, children }: Props) => {
    return (
        <Grid

            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid
                item
                className="box-shadow"
                xs={3}
                sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, width: { sm: 450 } }}
            >
                <Typography variant="h5" sx={{ marginBottom: 1 }}>{title}</Typography>

                {children}
            </Grid>
        </Grid>

    )
}
