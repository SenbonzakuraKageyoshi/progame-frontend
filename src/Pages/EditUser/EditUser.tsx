import React from 'react'
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentFromValues } from '../../types/studentFormValues';
import { editUser } from '../../services/userService';
import { getUser } from '../../services/userService';
import { User } from '../../types/user';
import BigLoader from '../../components/BigLoader/BigLoader';

const studentInputs = [
  {id: 1, name: 'firstName', label: 'Имя', type: 'text'},
  {id: 2, name: 'lastName', label: 'Фамилия', type: 'text'},
  {id: 3, name: 'patronymic', label: 'Отчество', type: 'text'},
  {id: 4, name: 'email', label: 'Email', type: 'text'},
  {id: 5, name: 'telephone', label: 'Номер телефона (начиная с 8)', type: 'number'},
] as const;

const EditUser = () => {

    const [user, setUser] = React.useState<null | Omit<User, 'accessToken'>>(null)

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    const { register, formState: { errors }, handleSubmit } = useForm<StudentFromValues>({ mode: 'onTouched'});

    React.useEffect(() => {
        getUser(Number(window.location.pathname.replace(/[^+\d]/g, '')))
        .then((data) => setUser(data))
        .catch(() => setProcessMessage('Ошибка при получении данных пользователя'))
    }, [])

    const onSubmitHandler = (data: StudentFromValues) => {
      if(user){
        setProcessMessage('Изменение данных пользователя...');

        editUser({id: user.id, role: user.role, firstName: data.firstName, lastName: data.lastName, patronymic: data.patronymic, email: data.email, telephone: data.telephone})
        .then(() => setProcessMessage('Данные пользователя изменены'))
        .catch((data) => setProcessMessage(data.response.data.message))
      }
    }

  if(user){
    return (
        <div className="studentForm">
            <div className="container">
                <div className="formContent">
                    <div className="formName">Редактирование данные пользователя</div>
                    <form className="loginForm" onSubmit={handleSubmit(onSubmitHandler)}>
                      {studentInputs.map((el) => (
                        <div className="formItem" key={el.id}>
                          <label htmlFor={el.name}>{el.label}:</label>
                          <input defaultValue={user[`${el.name}`]} type={el.type} className="formInput" {...register((el.name))}/>
                          {errors[`${el.name}`] && <p className='message'>{errors[`${el.name}`]?.message}</p>}
                        </div>
                      ))}
                      <FormSubmitButton name="Сохранить"/>
                      {processMessage && <p className='message'>{processMessage}</p>}
                    </form>
                </div>
            </div>
       </div>
      )
  }else{
    return <BigLoader />
  }
}

export default EditUser