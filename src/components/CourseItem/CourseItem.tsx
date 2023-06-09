import React, { SetStateAction, Dispatch } from 'react'
import { Course } from '../../types/course'
import { Role } from '../../types/role'
import { removeCourse } from '../../services/courseService'
import { StudentCourse } from '../../types/studentCourse'
import { createRequest } from '../../services/requestService'
import { serverUrl } from '../../api/api'

type ICourseItem = {
    courseHaveRequest?: boolean;
    role: Role;
    UserId: number;
    telephone: string;
    email: string;
    setCourses?: Dispatch<SetStateAction<null | Course[] | StudentCourse[]>>;
    userFullName: string;
} & Omit<Course, 'updatedAt'>

const CourseItem = (props: ICourseItem) => {

    const [haveRequest, setHaveRequest] = React.useState(props.courseHaveRequest);

    const onRemoveHndler = () => {
        removeCourse(props.id);
        props.setCourses!((prev) => (prev! as Course[]).filter((el) => el.id !== props.id))
    };

    const onRequestCreateHandler = () => {
        createRequest({UserId: props.UserId, CourseId: props.id, telephone: props.telephone, email: props.email, text: `Заявка на участие в курсе '${props.name}'`, authorName: props.userFullName})
        .then(() => setHaveRequest(true))
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
                Дата начала: {props.dateStart}
            </li>
            <li>
                Дата окнчания: {props.dateEnd}
            </li>
            <li>
                Цена: {props.price} руб
            </li>
        </ul>
        {console.log(haveRequest)!}
        <a href={`/courses/details/${props.id}`} className="cardButton">Подробнее</a>
        {props.role === 'student' ? haveRequest ? <button className="cardButton" style={{fontSize: '11px', background: 'var(--red)'}}>Заявка отправлена</button> : <button className="cardButton" onClick={onRequestCreateHandler}>Подать заявку</button> : null}
        {props.shedule ? <a href={`${serverUrl}/static/shedules/${props.shedule}`} download className="cardButton">Расписание</a> : <button className="cardButton" style={{fontSize: '11px'}}>Расписание не готово</button>}
        {
        props.role === 'admin'
        &&
        <>
        <a href={`/courses/members/${props.id}`} className="cardButton" style={{fontSize: '11px'}}>Участники курса</a>
        <a href={`/courses/edit/${props.id}`} className="cardButton">Редактировать</a>
        <button onClick={onRemoveHndler} className="cardButton" style={{background: 'var(--red)'}}>Удалить</button>
        </>
        }
    </div>
  )
}

export default CourseItem