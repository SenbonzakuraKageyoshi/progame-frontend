import React from 'react'
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CourseFormValues } from '../../types/courseFormValues';
import { getCourse, editCourse } from '../../services/courseService';
import { Role } from '../../types/role';
import { Course } from '../../types/course';
import BigLoader from '../../components/BigLoader/BigLoader';

const studentInputs = [
  {id: 1, name: 'name', label: 'Название курса', type: 'text'},
  {id: 2, name: 'price', label: 'Цена', type: 'number'},
  {id: 3, name: 'places', label: 'Количество мест', type: 'number'},
  {id: 4, name: 'teacher', label: 'Преподаватель', type: 'text'},
] as const;

const CourseEdit = () => {

    const [course, setCourse] = React.useState<null | Course>(null);

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    const [shedule, setShedule] = React.useState<null | string>(null);

    const { register, formState: { errors }, handleSubmit } = useForm<CourseFormValues & { status: string }>({ mode: 'onTouched'});

    React.useEffect(() => {
        getCourse(Number(window.location.pathname.replace(/[^+\d]/g, '')))
        .then((data) => {
            setCourse(data);
            setShedule(data.shedule);
        })
        .catch(() => setProcessMessage('Ошибка при получении данных курса'))
    }, [])

    const onSubmitHandler = (data: CourseFormValues & { status: string }) => {
      if(course){
        setProcessMessage('Изменение данных курса...');

        editCourse({...data, shedule, id: course.id})
        .then(() => setProcessMessage('Данные курса изменены'))
        .catch((data) => setProcessMessage(data.response.data.message))
      }
    }

  if(course){
    return (
        <div className="studentForm">
            <div className="container">
                <div className="formContent">
                    <div className="formName">Редактирование курса</div>
                    <form className="loginForm" onSubmit={handleSubmit(onSubmitHandler)}>
                      <div className="formItem">
                          <label htmlFor='description'>Статус курса:</label>
                          <select defaultValue={course.status} {...register(('status'))}>
                            <option value="Не начат">Не начат</option>
                            <option value="Начат">Начат</option>
                            <option value="Завершен">Завершен</option>
                          </select>
                          {errors.description && <p className='message'>{errors.description?.message}</p>}
                      </div>
                      {studentInputs.map((el) => (
                        <div className="formItem" key={el.id}>
                          <label htmlFor={el.name}>{el.label}:</label>
                          <input defaultValue={course[`${el.name}`]} type={el.type} className="formInput" {...register((el.name))}/>
                          {errors[`${el.name}`] && <p className='message'>{errors[`${el.name}`]?.message}</p>}
                        </div>
                      ))}
                      <div className="formItem">
                          <label htmlFor='description'>Описание курса:</label>
                          <textarea defaultValue={course.description} className="formInput" {...register(('description'))}/>
                          {errors.description && <p className='message'>{errors.description?.message}</p>}
                      </div>
                      <div className="formItem">
                          <label htmlFor='description'>Состав курса (вводите через ';'):</label>
                          <textarea defaultValue={course.features} className="formInput" {...register(('features'))}/>
                          {errors.description && <p className='message'>{errors.description?.message}</p>}
                      </div>
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

export default CourseEdit