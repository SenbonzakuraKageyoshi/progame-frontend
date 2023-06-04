import React from 'react'
import styles from './logoutButton.module.scss'
import { useAppDispatch } from '../../redux/redux-hooks'
import { fetchLogout } from '../../redux/userSlice/userSlice'

interface ILogoutButton {
  currentUserId: number
}

const LogoutButton = React.memo(({ currentUserId }: ILogoutButton) => {

  const dispatch = useAppDispatch();

  const onLogoutHandler = () => {
    dispatch(fetchLogout({ id: currentUserId }))
    .then(() => window.location.href = '/login')
  }

  return (
    <button onClick={onLogoutHandler} className={styles.logoutButton}>
        Выйти из профиля
    </button>
  )
})

export default LogoutButton