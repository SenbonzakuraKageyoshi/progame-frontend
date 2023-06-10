import React from 'react'
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentFromValues } from '../../types/studentFormValues';
import { createUser } from '../../services/userService';
import { Role } from '../../types/role';
import { useAppSelector } from '../../redux/redux-hooks';
import { user } from '../../redux/selectors';
import BackLink from '../../components/BackLink/BackLink';
import * as yup from "yup";

const studentInputs = [
  {id: 1, name: 'firstName', label: 'Имя', type: 'text'},
  {id: 2, name: 'lastName', label: 'Фамилия', type: 'text'},
  {id: 3, name: 'patronymic', label: 'Отчество', type: 'text'},
  {id: 4, name: 'email', label: 'Email', type: 'text'},
  {id: 5, name: 'telephone', label: 'Номер телефона (начиная с 8)', type: 'number'},
  {id: 6, name: 'password', label: 'Пароль', type: 'password'},
] as const;

const validationSchema = yup.object({
  firstName: yup.string().required('Поле обязательно к заполнению'),
  lastName: yup.string().required('Поле обязательно к заполнению'),
  patronymic: yup.string().required('Поле обязательно к заполнению'),
  email: yup.string().email('Введите корректную почту').required('Поле обязательно к заполнению'),
  telephone: yup.string().required('Поле обязательно к заполнению').min(11, 'Номер состоит из 11 цифр, начиная с 8').max(11, 'Номер состоит из 11 цифр, начиная с 8'),
  password: yup.string().required('Поле обязательно к заполнению').min(8, 'Пароль должен содержать минимум 8 символов')
}).required();

interface ICreateUser {
  type: Role
}

const CreateUser = ({ type }: ICreateUser) => {

  const { data, status } = useAppSelector(user);

  React.useEffect(() => {
    if(!data && status === 'idle'){
      window.location.href = '/login'
    }else if(!data && status === 'rejected'){
      window.location.href = '/login'
    }else if(data && status == 'fulfilled'){
      if(data.role === 'student'){
        window.location.href = '/'
      }
    }
  }, [data, status ])

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    const { register, formState: { errors }, handleSubmit } = useForm<StudentFromValues>({ mode: 'onTouched', resolver: yupResolver(validationSchema)});

    const onSubmitHandler = (data: StudentFromValues) => {

      setProcessMessage('Выполняется регистрация пользователя...');

      createUser({...data, role: type})
      .then(() => setProcessMessage('Пользователь зарегистрирован'))
      .catch((data) => setProcessMessage(data.response.data.message))
    }

  return (
    <div className="studentForm">
        <div className="container">
            <BackLink />
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