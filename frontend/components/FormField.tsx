import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

type FormFieldType = {
  name: string;
  label: string;
  type?: string;
};

export const FormField: React.FC<FormFieldType> = (props) => {
  const { name, label, type } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      {...register(name)}
      type={type}
      className="mb-20"
      size="small"
      label={label}
      variant="outlined"
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      fullWidth
      required
    />
  );
};
