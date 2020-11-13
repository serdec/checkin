import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import InputFieldWithAddButton from './input-field-with-add-button';
import CheckboxItem from './checkbox-item';
import styles from './checkbox-form.module.css';

const noop = () => {
  return;
};

const layout = {
  labelCol: { xs: { span: 20 }, sm: { span: 8 } },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 20,
      offset: 1,
    },
    sm: {
      span: 20,
      offset: 1,
    },
  },
};

const CheckboxForm = ({
  checkList = [],
  listName = '',
  onAddClick = noop,
  onChange = noop,
  onDeleteClick = noop,
} = {}) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div
      className={`${styles.checkboxForm} ${styles.checkboxForm_marginTop_2}`}
    >
      <Form {...layout}>
        {checkList.map((el) => {
          return (
            <Form.Item {...tailLayout} key={el.id}>
              <CheckboxItem
                id={el.id}
                label={el.value}
                checked={el.checked}
                onChange={() => onChange({ listName, id: el.id })}
                onDeleteClick={() => onDeleteClick({ listName, id: el.id })}
              />
            </Form.Item>
          );
        })}
        <Form.Item {...tailLayout}>
          <InputFieldWithAddButton
            value={inputValue}
            setValue={setInputValue}
            onAddClick={() => onAddClick({ listName, value: inputValue })}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

CheckboxForm.propTypes = {
  checkList: PropTypes.array,
  listName: PropTypes.string,
  onAddClick: PropTypes.func,
  onChange: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
export default CheckboxForm;
