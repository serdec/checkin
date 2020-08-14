import React, { useState } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';

import styles from '../../../checkin-content.module.css';

const noop = () => {
  return;
};
const AddFieldInput = ({ onAddClick = noop }) => {
  const [tasksInput, setTasksInput] = useState('');

  return (
    <>
      <Input
        style={{ width: '80%', borderRadius: '0.5em' }}
        type="text"
        placeholder="Add an item..."
        value={tasksInput}
        onChange={(e) => {
          const { value } = e.target;
          setTasksInput(value);
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onAddClick(tasksInput);
            setTasksInput('');
          }
        }}
      />
      <Button
        className={styles.addBtn}
        type="button"
        onClick={() => {
          onAddClick(tasksInput);
          setTasksInput('');
        }}
      >
        +
      </Button>
    </>
  );
};

AddFieldInput.propTypes = {
  onAddClick: PropTypes.func,
};
export default AddFieldInput;
