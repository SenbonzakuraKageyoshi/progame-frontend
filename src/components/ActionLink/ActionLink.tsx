import React from 'react'
import styles from './actionLink.module.scss'

interface IActionLink {
    href: string;
    name: string;
}

const ActionLink = ({ href, name }: IActionLink) => {
  return (
    <a href={href} className={styles.actionLink}>{name}</a>
  )
}

export default ActionLink