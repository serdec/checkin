import React from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const noop = () => {
  return;
};
const InputFieldWithAddButton = ({
  onAddClick = noop,
  value,
  setValue,
} = {}) => {
  return (
    <div className="inputFieldWithAddButtonSelector">
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
        className={styles.addBtn}
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

InputFieldWithAddButton.propTypes = {
  onAddClick: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.string,
};
export default InputFieldWithAddButton;
