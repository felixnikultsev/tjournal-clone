import React from 'react';
import { Button } from '@material-ui/core';
import { FormField } from '../../FormField';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationValidationSchema } from '../../../utils/validationSchemas';
import { UserApi } from '../../../utils/api';
import { CreateUserDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';
import Alert from '@material-ui/lab/Alert';
import { setUserData } from '../../../redux/slices/user';
import { useAppDispatch } from '../../../redux/hooks';

type RegistrationFormType = {
  openLoginHandler: () => void;
};

export const RegistrationForm: React.FC<RegistrationFormType> = (props) => {
  const { openLoginHandler } = props;
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegistrationValidationSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await UserApi.register(dto);
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
        <FormField name="fullName" label="Имя и фамилия" />
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
            Зарегистрироваться
          </Button>
          <Button color="primary" onClick={openLoginHandler}>
            Вход
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
