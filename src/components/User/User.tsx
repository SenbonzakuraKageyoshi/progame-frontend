import React from 'react';
import male from '../../images/male.svg';
import female from '../../images/female.svg';
import styles from './user.module.scss'
import { User as UserType } from '../../types/user';

const User = React.memo((props: Pick<UserType, 'firstName' | 'lastName' | 'patronymic' | 'role'>) => {
  return (
    <div className={styles.user}>
        <img src={male} alt="" className="userIcon" />
        <div className={styles.userInfo}>
            <div className={styles.userName}>{props.lastName} {props.firstName} {props.patronymic}</div>
            <div className={styles.userRole}>{props.role === 'student' ? 'Студент' : 'Админ'} Progame</div>
        </div>
    </div>
  )
})

export default User