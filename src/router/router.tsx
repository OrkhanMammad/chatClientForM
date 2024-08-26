import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProtectedComponent from "./protected/auth-protected.component";
import PublicComponent from "../core/layouts/public/public.component";
import HomeComponent from "../pages/home/home.component";
import { Routes } from './routes';
import SigninComponent from './../pages/signin/signin.component';
import AuthComponent from "../core/layouts/auth/auth.component";
import SignupComponent from "../pages/signup/signup.component";

const router = createBrowserRouter([
    {
        element: (
            <AuthProtectedComponent layout='public'>
                <PublicComponent />
            </AuthProtectedComponent>
        ),
        children: [
            {
                path: Routes.default,
                element: <HomeComponent />,
            },
        ],
    },
    {
        path: Routes.signin,
        element: (
            <AuthComponent>
                <SigninComponent />
            </AuthComponent>
        ),
    },
    {
        path: Routes.signup,
        element: (
            <AuthComponent>
                <SignupComponent />
            </AuthComponent>
        ),
    }
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
