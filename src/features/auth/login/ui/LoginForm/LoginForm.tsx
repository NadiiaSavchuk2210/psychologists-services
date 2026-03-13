import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@shared/ui';
import css from './LoginForm.module.css';
import * as yup from 'yup';
import { useAuthTranslation, useValidationTranslation } from '@shared/hooks';
import { useLoginMutation } from '@features/auth/model/queries';
import type { LoginFormData } from '@features/auth/types/types';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
}

const LoginForm = ({ onOpenChange }: Props) => {
  const loginMutation = useLoginMutation();

  const { t: tA } = useAuthTranslation();
  const { t: tV } = useValidationTranslation();

  const schema = yup.object({
    email: yup
      .string()
      .email(tV('invalid_email'))
      .required(tV('required', { field: tV('fields.email') })),
    password: yup
      .string()
      .required(tV('required', { field: tV('fields.password') })),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields, isValidating },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);

    loginMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  const isButtonDisabled =
    Object.keys(touchedFields).length > 0 && (!isValid || isValidating);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css['login-form']}>
      <div className={css['login-form__inputs']}>
        <Input
          type="email"
          placeholder={tA('loginEmailPlaceholder')}
          register={register('email')}
          error={errors.email}
          className={css['login-form__input']}
        />
        <Input
          type="password"
          placeholder={tA('loginPasswordPlaceholder')}
          register={register('password')}
          error={errors.password}
          className={css['login-form__input']}
        />
      </div>

      <Button
        className={css['login-form__btn']}
        type="submit"
        disabled={isButtonDisabled}
      >
        {tA('login')}
      </Button>
    </form>
  );
};

export default LoginForm;
