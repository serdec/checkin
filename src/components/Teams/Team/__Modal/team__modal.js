import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { func, bool, string } from 'prop-types';
import styles from './team__modal.module.css';

const Team__Modal = ({
  visible,
  setVisible,
  listName,
  addUsers,
  teamId,
} = {}) => {
  const [inputValue, setInputValue] = useState('');

  const handleOk = () => {
    setVisible(false);

    if (inputValue === '') {
      return;
    }

    const users = inputValue.split(',');
    addUsers({ teamId, users, listName });
  };

  return (
    <>
      <Modal
        className={styles.team__modal}
        title="Invite New Members to the Team"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <p>Insert a comma separated list of email addresses</p>
        <Input
          placeholder={'email addresses...'}
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
          }}
        />
      </Modal>
    </>
  );
};

Team__Modal.propTypes = {
  teamId: string,
  visible: bool,
  listName: string,
  addUsers: func,
  setVisible: func,
};

export default Team__Modal;
