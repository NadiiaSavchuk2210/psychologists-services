import clsx from "clsx"
import css from './MobileMenu.module.css'
import { Icon } from "../../../shared/ui";
import { Navbar } from "../../navbar";


interface Props {
    isMenuOpen: boolean,
    closeMenu: () => void;
}

const MobileMenu = ({ isMenuOpen, closeMenu }: Props) => {
    return (
        <div className={clsx(css["mobile-menu"], isMenuOpen && css.open)} data-menu>
            <div className={clsx("container", css["mobile-menu-container"])}>
                <button className={css["mobile-menu-close"]} onClick={closeMenu}>
                    <Icon className={css["mobile-menu-close-icon"]} name="icon-close" width={16} height={16} />
                </button>
                <Navbar isMobileMenu={true} closeMenu={closeMenu} />

                <button>Log in</button>
                <button>Registration</button>
            </div>
        </div>
    )
}

export default MobileMenu
