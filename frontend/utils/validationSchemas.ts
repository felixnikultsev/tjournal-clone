import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Некорректная эл. почта').required('Эл. почта обязательна'),
  password: Yup.string().min(6, 'Введите минимум 6 символов').required('Пароль обязателен'),
});

export const RegistrationValidationSchema = Yup.object()
  .shape({
    fullName: Yup.string()
      .test('count', 'Некорректные имя и фамилия', (value) => {
        const splittedString = value?.split(/\W+/);
        return splittedString?.length === 2 && splittedString.every((s) => s.length > 1);
      })
      .required('Имя и фамилия обязательны'),
  })
  .concat(LoginValidationSchema);
