import React from 'react';
import { string } from 'prop-types';
import styles from '../team.module.css';

const Team__SimpleField = ({ label = '', value = '' } = {}) => (
  <div className={styles.team__simpleField}>
    <div className={styles.team__label}>
      <h2>{label}: </h2>
    </div>
    <div className={styles.team__values}>
      <h3>{value}</h3>
    </div>
  </div>
);

Team__SimpleField.propTypes = {
  label: string,
  value: string,
};
export default Team__SimpleField;
