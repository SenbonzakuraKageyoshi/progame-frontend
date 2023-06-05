import React from 'react'
import { Role } from '../../types/role'
import { Course } from '../../types/course';
import { getCourse } from '../../services/courseService';
import { useAppSelector } from '../../redux/redux-hooks';
import { user } from '../../redux/selectors';
import BigLoader from '../../components/BigLoader/BigLoader';
import { serverUrl } from '../../api/api';

const CourseDetails = () => {

  const { data, status } = useAppSelector(user);

  const [course, setCourse] = React.useState<null | Course>(null);

  const [processMessage, setProcessMessage] = React.useState<null | string>(null);

  React.useEffect(() => {
    getCourse(Number(window.location.pathname.replace(/[^+\d]/g, '')))
    .then((data) => setCourse(data))
    .catch(() => setProcessMessage('Ошибка при получении данных курса'))
  }, [])
  
  if(!data || !course){
    return (
      <>
      <BigLoader/>
      {processMessage && <p className="message">{processMessage}</p>}
      </>
    )
  }else{
    return (
      <div className="courseDetails">
        <div className="container">
            <div className="courseDetailsTitle">Информация о курсе '{course.name}'</div>
            <ul className="courseDetailsList">
              <li className="courseDetailsListItem">
                Преподаватель: {course.teacher}
              </li> 
              <li className="courseDetailsListItem">
                Цена: {course.price}
              </li>
              <li className="courseDetailsListItem">
                Занято мест: {course.closedPlaces}
              </li>
            </ul>
            <p className="courseDescription">Описание: {course.description}</p>
            <ul className="courseFeatures">
              <div className="courseFeaturesTitle">Что входитв курс:</div>
                {course.features.split(';').map((el) => (
                    <li className="courseFeaturesItem">
                      {el}
                    </li>
                ))}
            </ul>
            {course.shedule ? <a href={`${serverUrl}/static/shedules/${course.shedule}`} className="cardButton" style={{fontSize: '11px'}}>Скачать расписание</a> : <button className="cardButton" style={{fontSize: '11px'}}>Расписание не готово</button>}
        </div>
      </div>
    )
  }
}

export default CourseDetails