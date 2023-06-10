import React from 'react'
import { Role } from '../../types/role'
import { Course } from '../../types/course';
import { getCourse } from '../../services/courseService';
import { useAppSelector } from '../../redux/redux-hooks';
import { user } from '../../redux/selectors';
import BigLoader from '../../components/BigLoader/BigLoader';
import { serverUrl } from '../../api/api';
import styles from './courseDetails.module.scss';
import BackLink from '../../components/BackLink/BackLink';

const CourseDetails = () => {

  const { data } = useAppSelector(user);

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
        <BackLink />
        <div className="container">
            <div className="formContent">
              <div className="formName">Информация о курсе '{course.name}'</div>
            </div>
            <ul className={styles.courseDetailsList}>
              <li className={styles.courseDetailsListItem}>
                Преподаватель: {course.teacher}
              </li> 
              <li className={styles.courseDetailsListItem}>
                Цена: {course.price}
              </li>
              <li className={styles.courseDetailsListItem}>
                Занято мест: {course.closedPlaces}
              </li>
              <li className={styles.courseDetailsListItem}>
                Дата начала: {course.dateStart}
              </li>
              <li className={styles.courseDetailsListItem}>
                Дата окончания: {course.dateEnd}
              </li>
            </ul>
            <div className={styles.courseDescription}>Описание: <p>{course.description}</p></div>
            <ul className={styles.courseFeatures}>
              <div className="courseFeaturesTitle">Что входит курс:</div>
                {course.features.split(';').map((el, idx) => (
                    <li className="courseFeaturesItem" key={el}>
                      {idx + 1}. {el}
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