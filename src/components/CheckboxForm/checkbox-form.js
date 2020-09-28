import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import AddFieldInput from './input-field';
import CheckboxItem from './checkbox-item';

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
  listName = '',
  onAddClick = noop,
  onDeleteClick = noop,
} = {}) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="checkboxForm">
      <Form {...layout}>
        {checkList.map((el) => {
          return (
            <Form.Item {...tailLayout} key={el.id}>
              <CheckboxItem
                id={el.id}
                label={el.value}
                onDeleteClick={() => onDeleteClick({ listName, id: el.id })}
              />
            </Form.Item>
          );
        })}
        <Form.Item {...tailLayout}>
          <AddFieldInput
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
  onDeleteClick: PropTypes.func,
};
export default CheckboxForm;
