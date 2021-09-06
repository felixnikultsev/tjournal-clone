import React from 'react';
import { Button } from '@material-ui/core';
import { FormField } from '../../FormField';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationValidationSchema } from '../../../utils/validationSchemas';

type RegistrationFormType = {
  openLoginHandler: () => void;
};

export const RegistrationForm: React.FC<RegistrationFormType> = (props) => {
  const { openLoginHandler } = props;

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegistrationValidationSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="fullname" label="Имя и фамилия" />
        <FormField name="email" label="Эл. почта" />
        <FormField name="password" label="Пароль" type="password" />
        <div className="d-flex align-center justify-between">
          <Button type="submit" color="primary" variant="contained" disabled={!form.formState.isValid}>
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
