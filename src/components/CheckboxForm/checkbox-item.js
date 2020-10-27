import React from 'react';
import { Checkbox } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';

import styles from './checkbox-form.module.css';

const noop = () => {
  return;
};

const CheckboxItem = ({
  id = '',
  label = '',
  checked = false,
  onDeleteClick = noop,
  onChange = noop,
}) => {
  return (
    <div className={styles.checkboxItem}>
      <Checkbox id={id} name="checkin" checked={checked} onChange={onChange}>
        <label className={styles.checkboxItem__label}>{label}</label>
      </Checkbox>
      <MinusCircleOutlined
        onClick={() => {
          onDeleteClick(id);
        }}
      />
    </div>
  );
};

CheckboxItem.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onDeleteClick: PropTypes.func,
  onChange: PropTypes.func,
};

export default CheckboxItem;
