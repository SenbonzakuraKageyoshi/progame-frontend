import React from 'react'
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentFromValues } from '../../types/studentFormValues';
import { createUser } from '../../services/userService';
import { Role } from '../../types/role';

const studentInputs = [
  {id: 1, name: 'firstName', label: 'Имя', type: 'text'},
  {id: 2, name: 'lastName', label: 'Фамилия', type: 'text'},
  {id: 3, name: 'patronymic', label: 'Отчество', type: 'text'},
  {id: 4, name: 'email', label: 'Email', type: 'text'},
  {id: 5, name: 'telephone', label: 'Номер телефона (начиная с 8)', type: 'number'},
  {id: 6, name: 'password', label: 'Пароль', type: 'password'},
] as const;

interface ICreateUser {
  type: Role
}

const CreateUser = ({ type }: ICreateUser) => {

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    const { register, formState: { errors }, handleSubmit } = useForm<StudentFromValues>({ mode: 'onTouched'});

    const onSubmitHandler = (data: StudentFromValues) => {

      setProcessMessage('Выполняется регистрация пользователя...');

      createUser({...data, role: type})
      .then(() => setProcessMessage('Пользователь зарегистрирован'))
      .catch((data) => setProcessMessage(data.response.data.message))
    }

  return (
    <div className="studentForm">
        <div className="container">
            <div className="formContent">
                <div className="formName">Регистрация {type === 'admin' ? 'администратора' : 'студента'}</div>
                <form className="loginForm" onSubmit={handleSubmit(onSubmitHandler)}>
                  {studentInputs.map((el) => (
                    <div className="formItem" key={el.id}>
                      <label htmlFor={el.name}>{el.label}:</label>
                      <input type={el.type} className="formInput" {...register((el.name))}/>
                      {errors[`${el.name}`] && <p className='message'>{errors[`${el.name}`]?.message}</p>}
                    </div>
                  ))}
                  <FormSubmitButton name="Зарегистрировать"/>
                  {processMessage && <p className='message'>{processMessage}</p>}
                </form>
            </div>
        </div>
   </div>
  )
}

export default CreateUser