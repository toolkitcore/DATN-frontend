import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, Typography, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classNames from 'classnames/bind';

import ToggleMode from '~/components/ToggleDarkMode';
import PasswordTextField from '~/components/PasswordTextField';
import { useDarkMode } from '~/stores';
import yup from '~/utils/common/validate/yupGlobal';

import loginImg from '~/assets/images/login-img.svg';
import logoImg from '~/assets/logos/logo-with-text.png';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const schema = yup.object().shape({
    email: yup.string().required('Email is required.').email(),
    password: yup.string().required('Password is required.'),
});

function Login() {
    const isDarkMode = useDarkMode((state) => state.enabledState);
    const {
        handleSubmit,
        control,
        watch,
        // formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });
    const [errorServer, setErrorServer] = useState('');

    const handleLogin = (data) => {
        console.log(data);
    };

    return (
        <div className={cx('wrapper')}>
            <ToggleMode className={cx('btn-toggle-mode')} />
            <div className={cx('left-wrapper', isDarkMode && 'dark-mode')}>
                <img className={cx('logo-img')} src={logoImg} alt="" />
                <Typography variant="h4" m={2}>
                    Hi, welcome back!
                </Typography>
                <img className={cx('bg-img')} src={loginImg} alt="" />
            </div>
            <div className={cx('right-wrapper')}>
                <Typography variant="h4" mb={2}>
                    Log in to HUST PVO
                </Typography>
                <div className={cx('register-wrapper')}>
                    <Typography variant="body2">New user?</Typography>
                    <Link ml={0.5} underline="hover" variant="subtitle2" component={RouterLink} to="/register">
                        Create an account
                    </Link>
                </div>
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            id="txtEmail"
                            type="email"
                            label="Email address"
                            margin="normal"
                            fullWidth
                            {...field}
                            error={!!error?.message}
                            title={error?.message}
                            helperText={error?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <PasswordTextField
                            id="txtPassword"
                            label="Password"
                            {...field}
                            error={!!error?.message}
                            title={error?.message}
                            helperText={error?.message}
                        />
                    )}
                />

                {errorServer && (
                    <Typography variant="body2" color="error.main" mt={1}>
                        {errorServer}
                    </Typography>
                )}
                <div className={cx('option-wrapper')}>
                    {/* <FormControlLabel 
                        control={<Checkbox />} 
                        label={<Typography variant='body2'>Remember me</Typography>}
                        checked={isRemember}
                        onChange={() => setRemember(!isRemember)}
                    /> */}
                    <div></div>
                    <Link
                        underline="always"
                        variant="body2"
                        color="inherit"
                        margin={1}
                        component={RouterLink}
                        to="/forgot-password"
                        state={{ email: watch('email') }}
                    >
                        Forgot password?
                    </Link>
                </div>
                <Button
                    sx={{ mt: 1, textTransform: 'none' }}
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit(handleLogin)}
                >
                    Log in
                </Button>
            </div>
        </div>
    );
}

export default Login;
