import React, { SetStateAction, Dispatch } from 'react'
import { User } from '../../types/user'
import { removeUser } from '../../services/userService'

type IUserItem = {
    setUsers: Dispatch<SetStateAction<null | Omit<User, 'accessToken'>[]>>;
} & Omit<User, 'accessToken' | 'passwordHash' | 'updatedAt'>

const UserItem = (props: IUserItem) => {

    const onRemoveHandler = () => {
        removeUser(props.id);
        props.setUsers((prev) => prev!.filter((el) => el.id !== props.id))
    }

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
                Дата регистрации: {new Date(props.createdAt).toLocaleDateString()}
            </li>
        </ul>
        <a href={`/users/edit/${props.id}`} className="cardButton">Редактировать</a>
        <button className="cardButton" style={{background: 'var(--red)'}} onClick={onRemoveHandler}>Удалить</button>
    </div>
  )
}

export default UserItem