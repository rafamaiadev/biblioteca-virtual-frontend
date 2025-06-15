import {Routes, Route} from 'react-router-dom';
import Login from '../features/auth/Login';
import Dashboard from '../features/dashboard/Dashboard';
import Livros from '../features/livros/Livros';
import Usuarios from '../features/usuarios/Usuarios';
import Acervo from '../features/acervo/Acervo';
import MeusLivros from '../features/livros/MeusLivros';
import PrivateRoute from '../features/auth/PrivateRoute';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/acervo"
                element={
                    <PrivateRoute>
                        <Acervo/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/livros"
                element={
                    <PrivateRoute>
                        <Livros/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/usuarios"
                element={
                    <PrivateRoute>
                        <Usuarios/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/meus-livros"
                element={
                    <PrivateRoute>
                        <MeusLivros/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
