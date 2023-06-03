import React from 'react'
import UserItem from '../../components/UserItem/UserItem'
import ActionLink from '../../components/ActionLink/ActionLink'
import { getUsers } from '../../services/userService'
import { User } from '../../types/user'
import { Role } from '../../types/role'
import BigLoader from '../../components/BigLoader/BigLoader'

interface IUsers {
  type: Role
}

const Users = ({ type }: IUsers) => {

  const [processMessage, setProcessMessage] = React.useState<null | string>(null);

  const [users, setUsers] = React.useState<null | Omit<User, 'accessToken'>[]>(null);

  React.useEffect(() => {
    getUsers(type)
    .then((data) => {
      setUsers(data)
    })
    .catch((data) => {
      setProcessMessage(data.response.data.message)
    })
  }, [])

  return (
    <>
    {
    !users
    ?
    <>
    <BigLoader />
    {processMessage && <p className='message'>{processMessage}</p>}
    </>
    :
    users.length === 0
    ?
    <p className='message'>{type === 'admin' ? 'Администраторов' : 'Студентов'} не существует</p>
    :
    <>
    {type === 'student' && <ActionLink href="/students/create" name="Зарегистрировать студента"/>}
    {type === 'admin' && <ActionLink href="/admins/create" name="Зарегистрировать админа"/>}
    <div className="list">
        <UserItem />
    </div>
    </>
    }
    </>
  )
}

export default Users