import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import AddFieldInput from './input-field';
import CheckboxItem from './checkbox-item';

import styles from '../../../checkin-content.module.css';

const noop = () => {
  return;
};
const layout = {
  labelCol: { xs: { span: 20 }, sm: { span: 8 } },
  wrapperCol: { span: 0 },
};
const tailLayout = {
  wrapperCol: {
    span: 18,
    offset: 1,
  },
};

const CheckboxForm = ({
  checkList = [],
  img = '',
  onAddClick = noop,
  onDeleteClick = noop,
}) => {
  return (
    <div className="checkboxForm">
      <Form {...layout}>
        <img className={styles.cardImg} src={img} />
        {checkList.map((el) => {
          return (
            <Form.Item {...tailLayout} key={el.id}>
              <CheckboxItem
                id={el.id}
                label={el.value}
                onDeleteClick={onDeleteClick}
              />
            </Form.Item>
          );
        })}
        <Form.Item {...tailLayout}>
          <AddFieldInput onAddClick={onAddClick} />
        </Form.Item>
      </Form>
    </div>
  );
};

CheckboxForm.propTypes = {
  checkList: PropTypes.array,
  img: PropTypes.string,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
export default CheckboxForm;
