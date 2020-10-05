import React from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';

import styles from './checkbox-form.module.css';

const noop = () => {
  return;
};
const inputField = ({ onAddClick = noop, value, setValue } = {}) => {
  return (
    <div className={styles.inputField}>
      <Input
        style={{ width: '80%', borderRadius: '0.5em' }}
        type="text"
        placeholder="Add an item..."
        value={value}
        onChange={(e) => {
          const { value } = e.target;
          setValue(value);
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onAddClick(value);
            setValue('');
          }
        }}
      />
      <Button
        className={styles.inputField__addButton}
        type="button"
        onClick={() => {
          onAddClick(value);
          setValue('');
        }}
      >
        +
      </Button>
    </div>
  );
};

inputField.propTypes = {
  onAddClick: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.string,
};
export default inputField;
