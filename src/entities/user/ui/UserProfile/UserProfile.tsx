import css from './UserProfile.module.css'
import Icon from '../../../../shared/ui/Icon/Icon';

const UserProfile = () => {
    return (
        <div className={css.user}>
            <div className={css["user-avatar"]}>
                <Icon name='icon-user' className={css["user-avatar-icon"]} width={24} height={24} />
            </div>
            <p className={css["user-name"]}>UserName</p>
        </div>
    )
}

export default UserProfile