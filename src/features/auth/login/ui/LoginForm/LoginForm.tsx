import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useLoginSchema } from '@features/auth/model/hooks/useLoginSchema';
import { useLoginMutation } from '@features/auth/model/queries';
import type { LoginFormData } from '@features/auth/types/types';
import { useAuthTranslation } from '@shared/hooks';
import { Button, Input } from '@shared/ui';

import css from './LoginForm.module.css';


interface Props {
  onOpenChange: (isOpen: boolean) => void;
}

const DEFAULT_VALUES: LoginFormData = {
  email: '',
  password: '',
};

const LoginForm = ({ onOpenChange }: Props) => {
  const { t: tA } = useAuthTranslation();

  const schema = useLoginSchema();
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields, isValidating },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: LoginFormData) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css['login-form']}
      noValidate
    >
      <div className={css['login-form__inputs']}>
        <Input
          type="email"
          label={tA('loginEmailPlaceholder')}
          hideLabel
          placeholder={tA('loginEmailPlaceholder')}
          register={register('email')}
          error={errors.email}
          autoComplete="email"
          className={css['login-form__input']}
        />
        <Input
          type="password"
          label={tA('loginPasswordPlaceholder')}
          hideLabel
          placeholder={tA('loginPasswordPlaceholder')}
          register={register('password')}
          error={errors.password}
          autoComplete="current-password"
          className={css['login-form__input']}
        />
      </div>

      <Button
        className={css['login-form__btn']}
        type="submit"
        disabled={isButtonDisabled || loginMutation.isPending}
      >
        {tA('login')}
      </Button>
    </form>
  );
};

export default LoginForm;
