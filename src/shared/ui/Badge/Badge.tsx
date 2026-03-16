import clsx from 'clsx';
import Icon from '../Icon/Icon';
import css from './Badge.module.css';

type Variant = 'primary' | 'secondary';

interface IconProps {
  iconName?: string;
  iconLabel?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconClassName?: string;
}

type BadgeProps = IconProps & {
  variant?: Variant;
  badgeClassName?: string;
  textClassName?: string;
  children: React.ReactNode;
};

const Badge = (props: BadgeProps) => {
  const {
    variant = 'primary',
    badgeClassName,
    textClassName,
    children,
    iconName,
    iconLabel,
    iconWidth,
    iconHeight,
    iconClassName,
  } = props;

  const badgeClasses = clsx(css.badge, css[variant], badgeClassName);
  const iconClasses = clsx(css.icon, css[variant], iconClassName);
  const textClasses = clsx(css.badgeText, css[variant], textClassName);

  return (
    <div className={badgeClasses}>
      <div className={css.badgeContent}>
        {iconName && (
          <Icon
            className={iconClasses}
            name={iconName}
            label={iconLabel}
            width={iconWidth || 16}
            height={iconHeight || 16}
          />
        )}
        <div className={textClasses}>{children}</div>
      </div>
    </div>
  );
};

export default Badge;
