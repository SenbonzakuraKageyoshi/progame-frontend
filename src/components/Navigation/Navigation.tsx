import React, { SetStateAction, Dispatch } from 'react'
import { CurrentLocation } from '../../types/currentLocation';
import styles from './navigation.module.scss'

const studentNavigation = [
  {id: 1, name: 'Мои курсы'},
  {id: 2, name: 'Выбрать курс'},
  {id: 3, name: 'Мои заявки'},
] as const;

const adminNavigation = [
  {id: 4, name: 'Студенты'},
  {id: 5, name: 'Администраторы'},
  {id: 6, name: 'Курсы'},
  {id: 7, name: 'Заявки'},
] as const;

interface INavigation {
  currentLocation: CurrentLocation;
  setCurrentLocation: Dispatch<SetStateAction<CurrentLocation>>;
}

const Navigation = ({ currentLocation, setCurrentLocation }: INavigation) => {

  const onClickHandler = (location: CurrentLocation) => {
    localStorage.setItem('progame-location', JSON.stringify(location));
    setCurrentLocation(location)
  }

  return (
    <nav className={styles.navigation}>
        {studentNavigation.map((el) => (
          el.id === currentLocation.id
          ?
          <button className={styles.navItemActive} key={el.id}>{el.name}</button>
          :
          <button className={styles.navItem} key={el.id} onClick={() => onClickHandler(el)}>{el.name}</button>
        ))}
        {adminNavigation.map((el) => (
          el.id === currentLocation.id
          ?
          <button className={styles.navItemActive} key={el.id}>{el.name}</button>
          :
          <button className={styles.navItem} key={el.id} onClick={() => onClickHandler(el)}>{el.name}</button>
        ))}
    </nav>
  )
}

export default Navigation