import React from 'react'
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';
import logo from '../../images/logoBig.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormValues } from '../../types/loginFormValues';
import { fetchLogin } from '../../redux/userSlice/userSlice';
import { useAppDispatch } from '../../redux/redux-hooks';
import styles from './login.module.scss'

const loginInputs = [
  {id: 1, name: 'email', label: 'Email', type: 'text'},
  {id: 2, name: 'telephone', label: 'Номер телефона', type: 'number'},
  {id: 3, name: 'password', label: 'Пароль', type: 'password'}
] as const;

const Login = () => {

  const [processMessage, setProcessMessage] = React.useState<null | string>(null);

  const dispatch = useAppDispatch();

  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormValues>({ mode: 'onTouched'});

  const onSubmitHandler = (data: LoginFormValues) => {
      setProcessMessage('Выполняется вход...');

      dispatch(fetchLogin(data))
      .then((data) => {
        if('error' in data){
          if(data.error.message!.includes('404')){
              setProcessMessage('Неверный номер, почта или пароль')
            }else if(data.error.message!.includes('500')){
              setProcessMessage('Ошибка работы сервера')
            }
        }else{
          window.location.href = '/'
        }
      })
      .catch(() => {
        setProcessMessage('Ошибка работы сервера')
      })
  }

  return (
   <div className="login">
        <div className="container">
            <div className="formContent">
                <img src={logo} alt="Progame лого" className="logo" width={315} height={95}/>
                <div className="formName">Логин</div>
                <form className="loginForm" onSubmit={handleSubmit(onSubmitHandler)}>
                  {loginInputs.map((el) => (
                    <div className="formItem" key={el.id}>
                      <label htmlFor={el.name}>{el.label}:</label>
                      <input type={el.type} className="formInput" {...register((el.name))}/>
                      {errors[`${el.name}`] && <p className='message'>{errors[`${el.name}`]?.message}</p>}
                    </div>
                  ))}
                  <FormSubmitButton name="Войти"/>
                  {processMessage && <p className='message'>{processMessage}</p>}
                </form>
            </div>
        </div>
   </div>
  )
}

export default Login