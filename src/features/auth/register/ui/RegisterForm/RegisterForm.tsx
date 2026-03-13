import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@shared/ui';
import css from './RegisterForm.module.css';
import * as yup from 'yup';
import {
  useAuthTranslation,
  useCommonTranslation,
  useValidationTranslation,
} from '@shared/hooks';
import { useRegisterMutation } from '@features/auth/model/queries';
import type { RegisterFormData } from '@features/auth/types/types';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
}

const RegisterForm = ({ onOpenChange }: Props) => {
  const registerMutation = useRegisterMutation();

  const { t: tA } = useAuthTranslation();
  const { t: tV } = useValidationTranslation();
  const { t: tCommon } = useCommonTranslation();

  const schema = yup.object({
    name: yup.string().required(tV('required', { field: tV('fields.name') })),
    email: yup
      .string()
      .email(tV('invalid_email'))
      .required(tV('required', { field: tV('fields.email') })),
    password: yup
      .string()
      .min(6, tV('min', { field: tV('fields.password'), min: 6 }))
      .required(tV('required', { field: tV('fields.password') })),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields, isValidating },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);

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
