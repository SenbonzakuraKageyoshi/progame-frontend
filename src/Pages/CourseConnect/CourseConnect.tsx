import React from 'react'
import { getCourse, getStudentCourse } from '../../services/courseService';
import { Course } from '../../types/course';
import { StudentCourse } from '../../types/studentCourse';
import { getUsers } from '../../services/userService';
import BigLoader from '../../components/BigLoader/BigLoader';
import { User } from '../../types/user';
import { addStudentToCourse, removeStudentToCourse } from '../../services/courseService';

const CourseConnect = () => {
    
    const [students, setStudents] = React.useState<null | Omit<User, 'accessToken'>[]>(null);
    const [addedStudents, setAddedStudents] = React.useState<number[]>([]);
    const [course, setCourse] = React.useState<null | Course>(null);
    const [studentCourse, setStudentCourse] = React.useState<null | StudentCourse[] | 'undefined'>(null);
    const [availablePlaces, setAvalablePlaces] = React.useState<null | number>(null);

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    console.log(addedStudents.length)

    React.useEffect(() => {
        getStudentCourse(null, Number(window.location.pathname.replace(/[^+\d]/g, '')))
        .then((data) => {
            setStudentCourse(data)

            if(data !== 'undefined'){
                const arr: number[] = []

                data.forEach((el) => {
                    arr.push(el.UserId)
                })

                setAddedStudents(arr)
            }
        })
        .catch(() => setProcessMessage('Ошибка при получении добавленных студентов к курсу'));

        getCourse(Number(window.location.pathname.replace(/[^+\d]/g, '')))
        .then((data) => {
            setCourse(data)
            setAvalablePlaces(data.places - data.closedPlaces)
        })
        .catch(() => setProcessMessage('Ошибка при получении данных курса'));

        getUsers('student')
        .then((data) => setStudents(data))
        .catch((data) => setProcessMessage(data.response.data.message))
    }, []);

    const onAddHandler = (UserId: number) => {
        setProcessMessage('Добавление студента к курсу...')

        addStudentToCourse(UserId, course!.id)
        .then(() => {
            const arr = [...addedStudents];
            arr.push(UserId)

            setAddedStudents(arr);
            setAvalablePlaces((prev) => prev! - 1);
            setProcessMessage('Студент добавлен к курсу');
        })
    };

    const onRemoveHandler = (UserId: number) => {
        setProcessMessage('Удаления студента из курса...')

        removeStudentToCourse(UserId, course!.id)
        .then(() => {
            const arr = [...addedStudents];
            arr.push(UserId)

            setAddedStudents(arr.filter((el) => el !== UserId));
            setAvalablePlaces((prev) => prev! + 1);
            setProcessMessage('Студент удален из курса');
        })
    };

  if(!course || !studentCourse || !students){
    return(
        <>
        <BigLoader />
        {processMessage && <p className="message">{processMessage}</p>}
        </>
    )
  }else{
    return (
        <div className="courseConnect">
            <div className="container">
                <div className="formContent">
                    <div className="formName">Добавление / удаление студентов для курса</div>
                    <div className="courseName">{course.name}</div>
                    {availablePlaces ? <div className='placesValue'>Доступных мест: {availablePlaces}</div> : <div className='placesValue'>Все места заняты</div>}
                    <ul className="students">
                        {students.map((el) => (
                            <li className="studentsItem" key={el.id}>
                                {el.lastName} {el.firstName} {el.patronymic}
                                {
                                addedStudents.length === 0
                                &&
                                <>
                                <p>Статус: Не добавлен</p>
                                <button className="actionButton" onClick={() => onAddHandler(el.id)}>Добавить</button>
                                </>
                                }
                                {
                                addedStudents.length !== 0
                                ?
                                addedStudents.includes(el.id)
                                ?
                                    <>
                                    <p>Статус: Добавлен</p>
                                    <button className="actionButton" onClick={() => onRemoveHandler(el.id)}>Удалить</button>
                                    </>
                                    :   
                                    <>
                                    <p>Статус: Не добавлен</p>
                                    {
                                    availablePlaces
                                    ?
                                    <button className="actionButton" onClick={() => onAddHandler(el.id)}>Добавить</button>
                                    :
                                    null
                                    }
                                    </>
                                :
                                null
                                }
                            </li>
                        ))}
                    </ul>
                    {processMessage && <p className='message'>{processMessage}</p>}
                </div>
            </div>
        </div>
    )
  }
}

export default CourseConnect