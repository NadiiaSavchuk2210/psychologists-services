import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useRegisterSchema } from '@features/auth/model/hooks/useRegisterSchema';
import { useRegisterMutation } from '@features/auth/model/queries';
import type { RegisterFormData } from '@features/auth/types/types';
import { useAuthTranslation, useCommonTranslation } from '@shared/hooks';
import { Button, Input } from '@shared/ui';

import css from './RegisterForm.module.css';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
}

const DEFAULT_VALUES: RegisterFormData = {
  name: '',
  email: '',
  password: '',
};

const RegisterForm = ({ onOpenChange }: Props) => {
  const { t: tA } = useAuthTranslation();
  const { t: tCommon } = useCommonTranslation();

  const registerMutation = useRegisterMutation();
  const schema = useRegisterSchema();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields, isValidating },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  const isButtonDisabled =
    Object.keys(touchedFields).length > 0 && (!isValid || isValidating);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css['register-form']}>
      <div className={css['register-form__inputs']}>
        <Input
          placeholder={tA('registerNamePlaceholder')}
          register={register('name')}
          error={errors.name}
          className={css['register-form__input']}
        />
        <Input
          type="email"
          placeholder={tA('registerEmailPlaceholder')}
          register={register('email')}
          error={errors.email}
          className={css['register-form__input']}
        />
        <Input
          type="password"
          placeholder={tA('registerPasswordPlaceholder')}
          register={register('password')}
          error={errors.password}
          className={css['register-form__input']}
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
