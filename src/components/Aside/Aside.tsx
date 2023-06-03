import React, { SetStateAction, Dispatch } from 'react'
import Logo from '../Logo/Logo';
import User from '../User/User';
import LogoutButton from '../LogoutButton/LogoutButton';
import Navigation from '../Navigation/Navigation';
import { CurrentLocation } from '../../types/currentLocation';
import arrow from '../../images/arrow.svg'
import styles from './aside.module.scss';

interface IAside {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
    currentLocation: CurrentLocation;
    setCurrentLocation: Dispatch<SetStateAction<CurrentLocation>>;
}

const Aside = ({ isOpened, setIsOpened, currentLocation, setCurrentLocation }: IAside) => {
  return (
    <div className={isOpened ? styles.asideActive : styles.aside}>
        <Logo />
        <div className={styles.asideMain}>
            <User />
            <Navigation currentLocation={currentLocation} setCurrentLocation={setCurrentLocation}/>
            <LogoutButton />
        </div>
        <img src={arrow} alt="Закрыть" className={styles.arrow} width={20} height={20} onClick={() => setIsOpened((prev) => !prev)}/>
    </div>
  )
}

export default Aside