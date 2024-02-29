import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from './themes'
import { Provider } from "react-redux"
import { store } from "./store"

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppTheme>
                    <AppRouter />
                </AppTheme>
            </BrowserRouter>
        </Provider>

    )
}
