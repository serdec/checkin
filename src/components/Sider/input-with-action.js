import React, { useState } from 'react';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './sider.module.css';

const noop = () => {};
const InputWithAction = ({
  onOk = noop,
  onDone = noop,
  onCancel = noop,
  actionName = 'Ok',
  placeholder = 'Insert here your input...',
} = {}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.inputWithAction}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button
        onClick={onCancel}
        className={styles.actionButton}
        type="secondary"
      >
        Cancel
      </Button>
      <Button
        className={styles.actionButton}
        type="primary"
        onClick={() => {
          onOk(inputValue);
          onDone();
          setInputValue('');
        }}
      >
        {actionName}
      </Button>
    </div>
  );
};

InputWithAction.propTypes = {
  onOk: PropTypes.func,
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
  actionName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputWithAction;
