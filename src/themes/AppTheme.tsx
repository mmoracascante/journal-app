import { FC, PropsWithChildren } from "react"
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from "./";


export const AppTheme: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
