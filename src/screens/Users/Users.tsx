import React from 'react'
import UserItem from '../../components/UserItem/UserItem'
import ActionLink from '../../components/ActionLink/ActionLink'
import { getUsers } from '../../services/userService'
import { User } from '../../types/user'
import { Role } from '../../types/role'
import BigLoader from '../../components/BigLoader/BigLoader'

interface IUsers {
  type: Role;
  currentUserId?: number;
}

const Users = ({ type, currentUserId }: IUsers) => {

  const [processMessage, setProcessMessage] = React.useState<null | string>(null);

  const [users, setUsers] = React.useState<null | Omit<User, 'accessToken'>[]>(null);

  React.useEffect(() => {
    getUsers(type)
    .then((data) => {
      if(currentUserId){
        setUsers(data.filter((el) => el.id !== currentUserId))
      }else{
        setUsers(data)
      }
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
    <>
    {type === 'student' && <ActionLink href="/students/create" name="Зарегистрировать студента"/>}
    {type === 'admin' && <ActionLink href="/admins/create" name="Зарегистрировать админа"/>}
    <p className='message'>{type === 'admin' ? 'Администраторов' : 'Студентов'} не существует</p>
    </>
    :
    <>
    {type === 'student' && <ActionLink href="/students/create" name="Зарегистрировать студента"/>}
    {type === 'admin' && <ActionLink href="/admins/create" name="Зарегистрировать админа"/>}
    <div className="list">
        {users.map((el) => (
          <UserItem
          setUsers={setUsers}
            firstName={el.firstName}
            lastName={el.lastName}
            patronymic={el.patronymic}
            email={el.email}
            telephone={el.telephone}
            createdAt={el.createdAt}
            role={el.role}
            id={el.id}
          />
        ))}
    </div>
    </>
    }
    </>
  )
}

export default Users