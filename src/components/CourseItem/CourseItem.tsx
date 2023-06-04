import React, { SetStateAction, Dispatch } from 'react'
import { Course } from '../../types/course'
import { Role } from '../../types/role'
import { removeCourse } from '../../services/courseService'
import { StudentCourse } from '../../types/studentCourse'

type ICourseItem = {
    role: Role;
    setCourses?: Dispatch<SetStateAction<null | Course[] | StudentCourse[]>>;
} & Omit<Course, 'updatedAt'>

const CourseItem = (props: ICourseItem) => {

    const onRemoveHndler = () => {
        removeCourse(props.id);
        props.setCourses!((prev) => (prev! as Course[]).filter((el) => el.id !== props.id))
    }

  return (
    <div className="card">
        <div className="cardName">{props.name}</div>
        <ul className="cardItemsList">
            <li>
                Статус: {props.status}
            </li>
            <li>
                Преподаватель: {props.teacher}
            </li>
            <li>
                Количество мест: {props.places}
            </li>
            <li>
                Осталось мест: {props.places - props.closedPlaces}
            </li>
            <li>
                Цена: {props.price} руб
            </li>
        </ul>
        {props.role === 'student' && <a href="" className="cardButton">Подать заявку</a>}
        {props.shedule ? <a href="" className="cardButton">Расписание</a> : <button className="cardButton" style={{fontSize: '11px'}}>Расписание не готово</button>}
        {
        props.role === 'admin'
        &&
        <>
        <a href={`/courses/connect/${props.id}`} className="cardButton" style={{fontSize: '11px'}}>Добавить студента</a>
        <a href={`/courses/edit/${props.id}`} className="cardButton">Редактировать</a>
        <button  onClick={onRemoveHndler} className="cardButton" style={{background: 'var(--red)'}}>Удалить</button>
        </>
        }
    </div>
  )
}

export default CourseItem