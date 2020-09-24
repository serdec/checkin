import React from 'react';
import { Checkbox } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';

import styles from './styles.module.css';

const noop = () => {
  return;
};

const CheckboxItem = ({
  onDeleteClick = noop,
  id = '',
  label = '',
  enabled = true,
}) => {
  return (
    <div className="checkboxItemSelector">
      <Checkbox id={id} name="checkin" enabled={enabled}>
        <label className={styles.labelValue}>{label}</label>
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
  onDeleteClick: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  enabled: PropTypes.bool,
};

export default CheckboxItem;
