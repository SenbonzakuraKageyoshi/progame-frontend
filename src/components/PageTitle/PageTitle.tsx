import React from 'react'
import styles from './pageTitle.module.scss'

interface IPageTitle {
    title: string
}

const PageTitle = ({ title }: IPageTitle) => {
  return (
    <div className={styles.pageTitle}>{title}</div>
  )
}

export default PageTitle