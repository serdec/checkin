import React from 'react';
import { bool, func, string } from 'prop-types';
import styles from './user-card.module.css';
import { CloseOutlined } from '@ant-design/icons';

const UserCard = ({
  img = '',
  isOwner = false,
  label = '',
  member = '',
  handleRemoveUser,
  onClick,
  className = '',
} = {}) => (
  <div onClick={onClick} className={`${styles.userCard} ${className}`}>
    {isOwner && (
      <div className={styles.userCard__controls}>
        <CloseOutlined onClick={() => handleRemoveUser(member)} />
      </div>
    )}
    <img src={img} width={100} height={100} />
    <div className={styles.userCard__label} key={label}>
      {label}
    </div>
  </div>
);

UserCard.propTypes = {
  img: string,
  isOwner: bool,
  label: string,
  member: string,
  handleRemoveUser: func,
  onClick: func,
  className: string,
};
export default UserCard;
