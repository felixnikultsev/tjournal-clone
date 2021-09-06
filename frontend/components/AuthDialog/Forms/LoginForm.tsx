import React from 'react';
import { Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidationSchema } from '../../../utils/validationSchemas';
import { FormField } from '../../FormField';

type LoginFormProps = {
  openRegistrationHandler: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { openRegistrationHandler } = props;

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginValidationSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="email" label="Эл. почта" />
        <FormField name="password" label="Пароль" type="password" />
        <div className="d-flex align-center justify-between">
          <Button type="submit" color="primary" variant="contained" disabled={!form.formState.isValid}>
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
