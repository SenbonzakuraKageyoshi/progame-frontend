import React, { SetStateAction, Dispatch } from 'react'
import Logo from '../Logo/Logo';
import User from '../User/User';
import LogoutButton from '../LogoutButton/LogoutButton';
import Navigation from '../Navigation/Navigation';
import { CurrentLocation } from '../../types/currentLocation';
import arrow from '../../images/arrow.svg'
import { useAppSelector } from '../../redux/redux-hooks';
import styles from './aside.module.scss';
import { user } from '../../redux/selectors';
import SmallLoader from '../SmallLoader/SmallLoader';

interface IAside {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
    currentLocation: CurrentLocation;
    setCurrentLocation: Dispatch<SetStateAction<CurrentLocation>>;
}

const Aside = ({ isOpened, setIsOpened, currentLocation, setCurrentLocation }: IAside) => {

  const { data, status } = useAppSelector(user);

  console.log(data)

  return (
    <div className={isOpened ? styles.asideActive : styles.aside}>
        <Logo />
        {
        !data && status === 'pending'
        ?
        <SmallLoader />
        :
        data && status === 'fulfilled'
        ?
        <>
        <div className={styles.asideMain}>
            <User />
            <Navigation currentLocation={currentLocation} setCurrentLocation={setCurrentLocation}/>
            <LogoutButton />
        </div>
        {isOpened && <img src={arrow} alt="Закрыть" className={styles.arrow} width={20} height={20} onClick={() => setIsOpened((prev) => !prev)}/>}
        </>
        :
        null
        }
    </div>
  )
}

export default Aside