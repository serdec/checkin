import React, { useState } from 'react';
import { Button, Dropdown, Input, Menu, message, Modal } from 'antd';
import PropTypes from 'prop-types';

import styles from '../app.module.css';
import { EditOutlined } from '@ant-design/icons';

const TeamPreview = ({ team, updateTeamName }) => {
  const [visible, setVisible] = useState(false);
  const [teamName, setTeamName] = useState('');

  function handleMenuClick(e) {
    if (e.key === 'delete') {
      message.info('Click on menu item1.');
      setVisible(true);
    }

    message.info('Click on menu item.');
  }

  const handleOk = () => {
    console.log('item deleted');
    setVisible(false);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="leave">Leave Team</Menu.Item>
    </Menu>
  );
  return (
    <div style={{ position: 'relative' }}>
      <Button className={styles.cardButton}>
        <div className={styles.text}>
          <img
            src={team.img}
            style={{ width: '80%', height: 'auto', maxHeight: '90%' }}
          />
          <div className={styles.teamName}>
            <Input
              className={styles.teamPreviewInputName}
              placeholder="Add a name"
              value={teamName}
              onChange={(e) => {
                const name = e.target.value;
                setTeamName(name);
                updateTeamName(name);
              }}
            />
          </div>
        </div>
      </Button>
      <div className={styles.editButton}>
        <Dropdown overlay={menu}>
          <Button
            type="secondary"
            style={{ border: '0px', boxShadow: '0 0' }}
            icon={<EditOutlined />}
          />
        </Dropdown>
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={() => console.log('ciao')}
          okText="Leave"
        >
          <p>Are you sure you want to leave the Team?</p>
        </Modal>
      </div>
    </div>
  );
};

TeamPreview.propTypes = {
  team: PropTypes.object,
  updateTeamName: PropTypes.func,
};

export default TeamPreview;
