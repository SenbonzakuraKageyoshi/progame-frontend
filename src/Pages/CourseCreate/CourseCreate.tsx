import React from 'react'
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CourseFormValues } from '../../types/courseFormValues';
import { createCourse } from '../../services/courseService';
import { Role } from '../../types/role';
import { uploadShedule } from '../../services/uploadsService';
import { useAppSelector } from '../../redux/redux-hooks';
import { user } from '../../redux/selectors';
import BackLink from '../../components/BackLink/BackLink';
import * as yup from "yup";

const studentInputs = [
  {id: 1, name: 'name', label: 'Название курса', type: 'text'},
  {id: 2, name: 'price', label: 'Цена', type: 'number'},
  {id: 3, name: 'places', label: 'Количество мест', type: 'number'},
  {id: 4, name: 'teacher', label: 'Преподаватель', type: 'text'},
  {id: 5, name: 'dateStart', label: 'Дата начала', type: 'date'},
  {id: 6, name: 'dateEnd', label: 'Дата окончания', type: 'date'},
] as const;

const validationSchema = yup.object({
  name: yup.string().required('Поле обязательно к заполнению'),
  price: yup.string().required('Поле обязательно к заполнению').test('value', 'Значение должно быть больше 0', val => !isNaN(Number(val)) && Number(val) > 0),
  places: yup.string().required('Поле обязательно к заполнению').test('value', 'Значение должно быть больше 0', val => !isNaN(Number(val)) && Number(val) > 0),
  teacher: yup.string().required('Поле обязательно к заполнению'),
  dateStart: yup.string().required('Поле обязательно к заполнению'),
  dateEnd: yup.string().required('Поле обязательно к заполнению'),
  description: yup.string().required('Поле обязательно к заполнению'),
  features: yup.string().required('Поле обязательно к заполнению'),
}).required();

const CourseCreate = () => {

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

    const inputSheduleRef = React.useRef<HTMLInputElement>(null);

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);
    const [sheduleIsLoading, setSheduleIsLoading] = React.useState(false);

    const [shedule, setShedule] = React.useState<null | string>(null);

    const { register, formState: { errors }, handleSubmit } = useForm<CourseFormValues>({ mode: 'onTouched', resolver: yupResolver(validationSchema)});

    const handleChangeShedule = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProcessMessage(null)
      try{
        const formData = new FormData();
        const file = (e.target as HTMLInputElement).files;
        
        if(!file){
          return
        };

        formData.append('file', file[0]);
        formData.append('fileName', file[0].name)

        setSheduleIsLoading(true);

          uploadShedule(formData)
          .then((data) => {
              setShedule(data.name);
              setSheduleIsLoading(false);
              setProcessMessage('Рапсание загружено');
          }).catch(() => {
            setProcessMessage('Ошибка при загрузке документов. Закройте форму и попробуйте снова');
            setSheduleIsLoading(false);
          })

      }catch(err){
          setProcessMessage('Ошибка при загрузке документов. Закройте форму и попробуйте снова');
        };
    }

    const onSubmitHandler = (data: CourseFormValues) => {

      setProcessMessage('Выполняется регистрация курса...');

      createCourse({...data, shedule})
      .then(() => setProcessMessage('Курс зарегистрирован'))
      .catch((data) => setProcessMessage(data.response.data.message))
    }

  return (
    <div className="studentForm">
        <BackLink />
        <div className="container">
            <div className="formContent">
                <div className="formName">Регистрация курса</div>
                <form className="loginForm" onSubmit={handleSubmit(onSubmitHandler)}>
                  {studentInputs.map((el) => (
                    <div className="formItem" key={el.id}>
                      <label htmlFor={el.name}>{el.label}:</label>
                      <input type={el.type} className="formInput" {...register((el.name))}/>
                      {errors[`${el.name}`] && <p className='message'>{errors[`${el.name}`]?.message}</p>}
                    </div>
                  ))}
                  <div className="formItem">
                      <label htmlFor='description'>Описание курса:</label>
                      <textarea className="formInput" {...register(('description'))}/>
                      {errors.description && <p className='message'>{errors.description?.message}</p>}
                  </div>
                  <div className="formItem">
                      <label htmlFor='features'>Состав курса (вводите через ';'):</label>
                      <textarea className="formInput" {...register(('features'))}/>
                      {errors.features && <p className='message'>{errors.features?.message}</p>}
                  </div>
                  <FormSubmitButton name="Зарегистрировать"/>
                  {!shedule && <button onClick={() => inputSheduleRef.current?.click()} type="button" className='uploads-button' disabled={sheduleIsLoading}>Загрузить расписание</button>}
                  {!sheduleIsLoading && <input type="file" accept=".pdf, .doc, .docx, .rtf, .txt, .pptx, .ppt, .pps, .odp, .zip" multiple onChange={(e) => handleChangeShedule(e)} hidden ref={inputSheduleRef} className="form-input-file"/>}
                  {processMessage && <p className='message'>{processMessage}</p>}
                </form>
            </div>
        </div>
   </div>
  )
}

export default CourseCreate