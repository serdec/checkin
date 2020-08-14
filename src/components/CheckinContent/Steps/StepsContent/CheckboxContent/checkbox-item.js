import React from 'react';
import { Checkbox } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';

import styles from '../../../checkin-content.module.css';

const noop = () => {
  return;
};

const CheckboxItem = ({ onDeleteClick = noop, id = '', label = '' }) => {
  return (
    <>
      <Checkbox id={id} name="checkin">
        <label className={styles.labelValue}>{label}</label>
      </Checkbox>
      <MinusCircleOutlined
        onClick={() => {
          onDeleteClick(id);
        }}
      />
    </>
  );
};

CheckboxItem.propTypes = {
  onDeleteClick: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
};

export default CheckboxItem;
