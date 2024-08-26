import React from 'react';
import { useFormik } from 'formik';
import { useSigninStyles } from './signin.style';
import InputComponent from '../../core/shared/input/input.component';
import ButtonComponent from '../../core/shared/button/button.component';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../core/configs/axios.config';
import { Routes } from '../../router/routes';
import { errorToast, successToast } from '../../core/shared/toast/toast';

const SigninComponent: React.FC = () => {
    const { main, title, buttons, form } = useSigninStyles();
    const navigate = useNavigate();


    const authenticateUser = async (userData: { username: string }) => {
        try {
            const response = await axiosInstance.get('/Auth/Login', {
                params: { name: userData.username }
            });

          
            localStorage.setItem('user', JSON.stringify(response.data));

            navigate(Routes.home);
            successToast("Logged in");
        } catch (error) {
            console.error('An error occurred while trying to sign in:', error);
            errorToast('Login failed');
        }
    };

 
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: values => {
            const errors: { username?: string } = {};
            if (!values.username) {
                errors.username = 'Username is required';
            }
            return errors;
        },
        onSubmit: values => {
            authenticateUser(values);
        }
    });

    return (
        <div className={main}>
            <p>Welcome to Site</p>
            <h1 className={title}>Sign in</h1>
            <form className={form} onSubmit={formik.handleSubmit}>
                <InputComponent
                    name="username"
                    label='Enter your username'
                    type="text"
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
                />
                <div className={buttons}>
                    <ButtonComponent
                        content="Sign in"
                        btnClassName='buttonMain'
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default SigninComponent;
