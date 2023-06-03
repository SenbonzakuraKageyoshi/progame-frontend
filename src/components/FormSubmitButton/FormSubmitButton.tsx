import React from 'react'
import styles from './formSubmitButton.module.scss'

interface IFormSubmitButton {
    name: string
}

const FormSubmitButton = ({ name }: IFormSubmitButton) => {
  return (
    <button className={styles.submitButton} type="submit">{name}</button>
  )
}

export default FormSubmitButton