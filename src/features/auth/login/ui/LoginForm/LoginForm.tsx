import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useLoginSchema } from '@features/auth/model/hooks/useLoginSchema';
import { useLoginMutation } from '@features/auth/model/queries';
import type { LoginFormData } from '@features/auth/types/types';
import { useAuthTranslation } from '@shared/hooks';
import {
  LOGIN_DEFAULT_VALUES,
  useFormDraftStore,
} from '@shared/lib/store/formDraftStore';
import { Button, Input } from '@shared/ui';

import css from './LoginForm.module.css';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
}

const LoginForm = ({ onOpenChange }: Props) => {
  const { t: tA } = useAuthTranslation();

  const schema = useLoginSchema();
  const loginMutation = useLoginMutation();
  const loginDraft = useFormDraftStore(state => state.login);
  const setLoginDraft = useFormDraftStore(state => state.setLogin);
  const resetLoginDraft = useFormDraftStore(state => state.resetLogin);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, touchedFields, isValidating },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: loginDraft,
  });

  const watchedValues = useWatch({
    control,
  });

  useEffect(() => {
    setLoginDraft({
      email: watchedValues.email ?? '',
      password: watchedValues.password ?? '',
    });
  }, [setLoginDraft, watchedValues.email, watchedValues.password]);

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        reset(LOGIN_DEFAULT_VALUES);
        resetLoginDraft();
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
          reserveErrorSpace
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
          reserveErrorSpace
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
