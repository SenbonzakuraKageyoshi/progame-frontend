import React from 'react';
import male from '../../images/male.svg';
import female from '../../images/female.svg';
import styles from './user.module.scss'

const User = React.memo(() => {
  return (
    <div className={styles.user}>
        <img src={male} alt="" className="userIcon" />
        <div className={styles.userInfo}>
            <div className={styles.userName}>Петров Петр Петрович</div>
            <div className={styles.userRole}>Студент Progame</div>
        </div>
    </div>
  )
})

export default User