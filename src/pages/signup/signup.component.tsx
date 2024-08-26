import React from 'react';
import { useFormik } from 'formik';
import { useSignupStyles } from './signup.style';
import InputComponent from '../../core/shared/input/input.component';
import ButtonComponent from '../../core/shared/button/button.component';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../core/configs/axios.config';
import { Routes } from '../../router/routes';
import { errorToast, successToast } from '../../core/shared/toast/toast';

const SignupComponent = () => {
    const classes = useSignupStyles();

    const addUser = async (userData:any) => {
        try {
            await axiosInstance.post('/users', userData);
            successToast('Signup successful!');
        } catch (error) {
            errorToast('An error occurred during signup.');
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            avatar: null
        },
        onSubmit: values => {
            addUser(values);
        }
    });

    return (
        <div className={classes.main}>
            <div className={classes.signUpHeader}>
                <p>Welcome to Site</p>
                <div>
                    <p>Have an Account?</p>
                    <NavLink className={classes.signUptoSingIn} to={'/' + Routes.signin}>Sign in</NavLink>
                </div>
            </div>
            <h1 className={classes.title}>Sign up</h1>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <InputComponent
                    name="username"
                    label="Enter username"
                    type="text"
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
                />
                <InputComponent
                    name="avatar"
                    label="Upload Avatar"
                    type="file"
                    onChange={(event:any) => formik.setFieldValue('avatar', event.currentTarget.files[0])}
                />
                <div className={classes.buttons}>
                    <ButtonComponent
                        type='submit'
                        content="Sign up"
                        btnClassName="buttonMain"
                    />
                </div>
            </form>
        </div>
    );
};

export default SignupComponent;
