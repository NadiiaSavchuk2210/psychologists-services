import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useRegisterSchema } from '@features/auth/model/hooks/useRegisterSchema';
import { useRegisterMutation } from '@features/auth/model/queries';
import type { RegisterFormData } from '@features/auth/types/types';
import { useAuthTranslation, useCommonTranslation } from '@shared/hooks';
import {
  REGISTER_DEFAULT_VALUES,
  useFormDraftStore,
} from '@shared/lib/store/formDraftStore';
import { Button, Input } from '@shared/ui';

import css from './RegisterForm.module.css';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
}

const RegisterForm = ({ onOpenChange }: Props) => {
  const { t: tA } = useAuthTranslation();
  const { t: tCommon } = useCommonTranslation();

  const registerMutation = useRegisterMutation();
  const schema = useRegisterSchema();
  const registerDraft = useFormDraftStore(state => state.register);
  const setRegisterDraft = useFormDraftStore(state => state.setRegister);
  const resetRegisterDraft = useFormDraftStore(state => state.resetRegister);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, touchedFields, isValidating },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: registerDraft,
  });

  const watchedValues = useWatch({
    control,
  });

  useEffect(() => {
    setRegisterDraft({
      name: watchedValues.name ?? '',
      email: watchedValues.email ?? '',
      password: watchedValues.password ?? '',
    });
  }, [
    setRegisterDraft,
    watchedValues.email,
    watchedValues.name,
    watchedValues.password,
  ]);

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        reset(REGISTER_DEFAULT_VALUES);
        resetRegisterDraft();
        onOpenChange(false);
      },
    });
  };

  const isButtonDisabled =
    Object.keys(touchedFields).length > 0 && (!isValid || isValidating);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css['register-form']}
      noValidate
    >
      <div className={css['register-form__inputs']}>
        <Input
          label={tA('registerNamePlaceholder')}
          hideLabel
          placeholder={tA('registerNamePlaceholder')}
          register={register('name')}
          error={errors.name}
          autoComplete="name"
          className={css['register-form__input']}
          reserveErrorSpace
        />
        <Input
          type="email"
          label={tA('registerEmailPlaceholder')}
          hideLabel
          placeholder={tA('registerEmailPlaceholder')}
          register={register('email')}
          error={errors.email}
          autoComplete="email"
          className={css['register-form__input']}
          reserveErrorSpace
        />
        <Input
          type="password"
          label={tA('registerPasswordPlaceholder')}
          hideLabel
          placeholder={tA('registerPasswordPlaceholder')}
          register={register('password')}
          error={errors.password}
          autoComplete="new-password"
          className={css['register-form__input']}
          reserveErrorSpace
        />
      </div>
      <Button
        className={css['register-form__btn']}
        type="submit"
        disabled={isButtonDisabled || registerMutation.isPending}
      >
        {registerMutation.isPending ? tCommon('loading') : tA('registerButton')}
      </Button>
    </form>
  );
};

export default RegisterForm;
