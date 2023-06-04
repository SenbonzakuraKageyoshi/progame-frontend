import React from 'react'
import CourseItem from '../../components/CourseItem/CourseItem'
import { Course } from '../../types/course'
import BigLoader from '../../components/BigLoader/BigLoader'
import ActionLink from '../../components/ActionLink/ActionLink'
import { getCourses } from '../../services/courseService'
import { Role } from '../../types/role'

interface ICourses {
    role: Role
}

const Courses = ({ role }: ICourses) => {

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    const [courses, setCourses] = React.useState<null | Course[]>(null)

    React.useEffect(() => {
        getCourses(role)
        .then((data) => {
            setCourses(data)
        })
        .catch((data) => {
          setProcessMessage(data.response.data.message)
        })
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
        <ActionLink href="/students/create" name="Зарегистрировать курс"/>
        <div className="list">
            {courses.map((el) => (
              <CourseItem
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
        </>
        }
        </>
      )
}

export default Courses