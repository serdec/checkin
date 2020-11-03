import React from 'react';
import { object, string } from 'prop-types';

import Link from 'next/link';
import styles from '../app-header.module.css';

const AppHeader__LinkButton = ({
  label = '',
  href = '',
  as = '',
  icon,
} = {}) => (
  <div className={styles.appHeader__button}>
    {icon}
    <Link href={href} as={as}>
      <a className={styles.appHeader__linkButton}>{label}</a>
    </Link>
  </div>
);
AppHeader__LinkButton.propTypes = {
  label: string,
  href: string,
  as: string,
  icon: object,
};
export default AppHeader__LinkButton;
