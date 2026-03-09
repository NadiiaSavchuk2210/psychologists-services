import clsx from 'clsx'
import css from './Header.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts'
import { Navbar } from '../../../widgets/navbar';
import { Icon } from '../index';
import { MobileMenu } from '../../../widgets/mobile-menu';
import { AuthNavigation } from '../../../features/auth-navigation';


const Header = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);


    return (
        <header className={css.header}>
            <div className={clsx('container', css["header-container"])}>
                <Link className={css["header-logo"]} to="/" aria-label="Psychologists Services Home" onClick={closeMenu}>
                    <span className={css["header-logo-accent"]}>psychologists.</span>
                    services
                </Link>


                {!isMobile &&
                    <>
                        <Navbar />
                        <AuthNavigation />
                    </>
                }

                {isMobile && <button className={css["burger-btn"]} type="button" onClick={openMenu}>
                    <Icon name='icon-burger' className={css["burger-icon"]} width={24} height={24} />
                </button>}
            </div>

            {isMobile && <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />}
        </header>
    )
}

export default Header