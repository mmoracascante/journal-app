import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from '../auth';
import { JournalRoutes } from "../journal";
import { CheckingAuth } from "../ui";
import { useStatus } from "../hooks";


export const AppRouter = () => {

    const { status } = useStatus()

    if (status === 'checking') return < CheckingAuth />



    return (
        <Routes>

            {
                status === 'authenticated' ? (<Route path="/*" element={<JournalRoutes />} />)
                    : (<Route path="auth/*" element={<AuthRoutes />} />)
            }
            <Route path="/*" element={<Navigate to='/auth/login' />} />


        </Routes>
    )
}
