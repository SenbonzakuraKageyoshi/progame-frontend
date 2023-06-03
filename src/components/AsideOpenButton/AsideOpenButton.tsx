import React, { SetStateAction, Dispatch } from 'react'
import menu from '../../images/menu.svg';
import styles from './asideOpenButton.module.scss'

interface IAsideOpenButton {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
}

const AsideOpenButton = ({ isOpened, setIsOpened }: IAsideOpenButton) => {
  return (
    <div className={isOpened ? styles.asideOpenButton : styles.asideOpenButtonActive}>
        <img src={menu} alt="Открыть" className={styles.menu} width={25} height={20} onClick={() => setIsOpened((prev) => !prev)}/>
    </div>
  )
}

export default AsideOpenButton