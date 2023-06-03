import React from 'react'
import { User } from '../../types/user'

const UserItem = (props: Omit<User, 'accessToken' | 'passwordHash' | 'updatedAt'>) => {
  return (
    <div className="card">
        <div className="cardName">{props.lastName} {props.firstName} {props.patronymic}</div>
        <ul className="cardItemsList">
            <li>
                Email: {props.email}
            </li>
            <li>
                Телефон: {props.telephone}
            </li>
            <li>
                Дата регистрации: <div>{new Date(props.createdAt).toLocaleDateString()}</div>
            </li>
        </ul>
        <a href={`/users/edit/${props.id}`} className="cardButton">Редактировать</a>
        <a href="" className="cardButton" style={{background: 'var(--red)'}}>Удалить</a>
    </div>
  )
}

export default UserItem