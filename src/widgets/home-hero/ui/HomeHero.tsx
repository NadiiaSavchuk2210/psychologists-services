import { Button } from '../../../shared/ui';
import css from './HomeHero.module.css';
import { ROUTES } from '../../../app/router/routesConfig';
import Icon from '../../../shared/ui/Icon/Icon';

import heroJpg1x from '../../../assets/images/hero/hero-psychologist.jpg';
import heroJpg2x from '../../../assets/images/hero/hero-psychologist@2x.jpg';
import heroWebp1x from '../../../assets/images/hero/hero-psychologist.webp';
import heroWebp2x from '../../../assets/images/hero/hero-psychologist@2x.webp';
import clsx from 'clsx';

const HomeHero = () => {
  return (
    <section className={css.hero}>
      <div className={clsx('container', css['hero-container'])}>
        <div className={css['hero-text-wrap']}>
          <h1 className={css['hero-title']}>
            The road to the
            <span className={css['hero-title-accent']}> depths</span> of the
            human soul
          </h1>
          <p className={css['hero-text']}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>

          <Button
            className={css['hero-btn-link']}
            as="link"
            href={ROUTES.PSYCHOLOGISTS}
          >
            Get started
            <Icon
              className={css['hero-btn-icon']}
              name="icon-arrow"
              width={14}
              height={16}
            />
          </Button>
        </div>

        <div className={css['hero-picture-container']}>
          <picture className={css['hero-picture']}>
            <source
              type="image/webp"
              srcSet={`${heroWebp1x} 1x, ${heroWebp2x} 2x`}
            />

            <source
              type="image/jpeg"
              srcSet={`${heroJpg1x} 1x, ${heroJpg2x} 2x`}
            />

            <img
              className={css['hero-img']}
              src={heroJpg1x}
              alt="Psychologist"
              width="464"
            />
          </picture>

          <ul className={css['icon-list']}>
            <li className={css['icon-item']}>
              <div
                className={clsx(css['icon-wrapper'], css['icon-wrapper-first'])}
              >
                <Icon
                  className={css.icon}
                  name="icon-question"
                  width={10}
                  height={17}
                />
              </div>
            </li>

            <li className={css['icon-item']}>
              <div
                className={clsx(
                  css['icon-wrapper'],
                  css['icon-wrapper-second']
                )}
              >
                <Icon
                  className={css.icon}
                  name="icon-users"
                  width={25}
                  height={25}
                />
              </div>
            </li>
          </ul>

          <div className={css['hero-stat']}>
            <div className={css['hero-stat-icon-wrap']}>
              <Icon className={css['hero-stat-icon']} name="icon-check" />
            </div>
            <div className={css['hero-stat-wrap']}>
              <span className={css['hero-stat-label']}>
                Experienced psychologists
              </span>
              <span className={css['hero-stat-value']}>15,000</span>
            </div>
          </div>
        </div>
      </div>
      <div className={css['hero-decoration']}>
        <Icon className={css['hero-decoration-icon']} name="icon-ellipse" />
      </div>
    </section>
  );
};

export default HomeHero;
