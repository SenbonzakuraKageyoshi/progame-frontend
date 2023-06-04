import React from 'react'
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CourseFormValues } from '../../types/courseFormValues';
import { createCourse } from '../../services/courseService';
import { Role } from '../../types/role';
import { uploadShedule } from '../../services/uploadsService';

const studentInputs = [
  {id: 1, name: 'name', label: 'Название курса', type: 'text'},
  {id: 2, name: 'price', label: 'Цена', type: 'number'},
  {id: 3, name: 'places', label: 'Количество мест', type: 'number'},
  {id: 4, name: 'teacher', label: 'Преподаватель', type: 'text'},
] as const;

const CourseCreate = () => {

    const inputSheduleRef = React.useRef<HTMLInputElement>(null);

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);
    const [sheduleIsLoading, setSheduleIsLoading] = React.useState(false);

    const [shedule, setShedule] = React.useState<null | string>(null);

    const { register, formState: { errors }, handleSubmit } = useForm<CourseFormValues>({ mode: 'onTouched'});

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
                      <label htmlFor='description'>Состав курса (вводите через ';'):</label>
                      <textarea className="formInput" {...register(('features'))}/>
                      {errors.description && <p className='message'>{errors.description?.message}</p>}
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