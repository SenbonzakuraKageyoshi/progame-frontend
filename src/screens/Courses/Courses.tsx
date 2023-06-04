import React from 'react'
import CourseItem from '../../components/CourseItem/CourseItem'
import { Course } from '../../types/course'
import BigLoader from '../../components/BigLoader/BigLoader'
import ActionLink from '../../components/ActionLink/ActionLink'
import { getCourses, getMyCourses } from '../../services/courseService'
import { Role } from '../../types/role'
import { StudentCourse } from '../../types/studentCourse'

interface ICourses {
    role: Role;
    type: 'all' | 'my';
    currentUserId?: number;
}

const Courses = ({ role, type, currentUserId }: ICourses) => {

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    const [courses, setCourses] = React.useState<null | Course[] | StudentCourse[]>(null)

    React.useEffect(() => {
        if(type === 'all'){
          getCourses(role, currentUserId)
          .then((data) => {
              setCourses(data)
          })
          .catch((data) => {
            setProcessMessage(data.response.data.message)
          })
        }else{
          getMyCourses(currentUserId!)
          .then((data) => {
              setCourses(data)
          })
          .catch((data) => {
            setProcessMessage(data.response.data.message)
          })
        }
      }, [])

    return (
        <>
        {
        !courses
        ?
        <>
        <BigLoader />
        {processMessage && <p className='message'>{processMessage}</p>}
        </>
        :
        courses.length === 0
        ?
        <>
        <ActionLink href="/courses/create" name="Зарегистрировать курс"/>
        <p className='message'>Курсов не существует</p>
        </>
        :
        <>
        <ActionLink href="/courses/create" name="Зарегистрировать курс"/>
        {
          type === 'all'
          ?
          <div className="list">
            {(courses as Course[]).map((el) => (
              <CourseItem
              setCourses={setCourses}
              id={el.id}
              name={el.name}
              status={el.status}
              price={el.price}
              description={el.price}
              shedule={el.shedule}
              closedPlaces={el.closedPlaces}
              places={el.places}
              createdAt={el.createdAt}
              features={el.features}
              teacher={el.teacher}
              role={role}
              />
            ))}
          </div>
          :
          <div className="list">
            {(courses as StudentCourse[]).map((el) => (
              <CourseItem
              id={el.CourseId}
              name={el.Course.name}
              status={el.Course.status}
              price={el.Course.price}
              description={el.Course.price}
              shedule={el.Course.shedule}
              closedPlaces={el.Course.closedPlaces}
              places={el.Course.places}
              createdAt={el.Course.createdAt}
              features={el.Course.features}
              teacher={el.Course.teacher}
              role={role}
              />
            ))}
          </div>
        }
        </>
        }
        </>
      )
}

export default Courses