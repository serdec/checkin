import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { func, bool, string } from 'prop-types';
import styles from './app-header__modal.module.css';

const AppHeader__Modal = ({
  visible = false,
  setVisible,
  addMembers,
  teamId,
} = {}) => {
  const [inputValue, setInputValue] = useState('');
  const handleOk = () => {
    setVisible(false);

    if (inputValue === '') {
      return;
    }

    const users = inputValue.split(',');
    addMembers({ teamId, users });
  };

  return (
    <>
      <Modal
        className={styles.appHeader__modal}
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

AppHeader__Modal.propTypes = {
  teamId: string,
  visible: bool,
  addMembers: func,
  setVisible: func,
};

export default AppHeader__Modal;
