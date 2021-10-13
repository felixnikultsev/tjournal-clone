import React from 'react';
import { Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidationSchema } from '../../../utils/validationSchemas';
import { FormField } from '../../FormField';
import { LoginDto } from '../../../utils/api/types';
import { UserApi } from '../../../utils/api';
import { setCookie } from 'nookies';
import Alert from '@material-ui/lab/Alert';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';

type LoginFormProps = {
  openRegistrationHandler: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { openRegistrationHandler } = props;
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginValidationSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await UserApi.login(dto);
      setCookie(null, 'rtoken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (error: any) {
      console.warn('Ошибка при регистрации', error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="email" label="Эл. почта" />
        <FormField name="password" label="Пароль" type="password" />
        {errorMessage && (
          <Alert severity="error" className="mb-20">
            {errorMessage}
          </Alert>
        )}
        <div className="d-flex align-center justify-between">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Войти
          </Button>
          <Button color="primary" onClick={openRegistrationHandler}>
            Регистрация
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
