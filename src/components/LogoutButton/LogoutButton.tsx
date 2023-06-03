import React from 'react'
import styles from './logoutButton.module.scss'

const LogoutButton = React.memo(() => {
  return (
    <button className={styles.logoutButton}>
        Выйти из профиля
    </button>
  )
})

export default LogoutButton