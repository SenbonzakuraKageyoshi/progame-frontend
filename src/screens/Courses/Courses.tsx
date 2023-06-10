import React from 'react'
import CourseItem from '../../components/CourseItem/CourseItem'
import { Course } from '../../types/course'
import BigLoader from '../../components/BigLoader/BigLoader'
import ActionLink from '../../components/ActionLink/ActionLink'
import { getCourses, getMyCourses } from '../../services/courseService'
import { Role } from '../../types/role'
import { StudentCourse } from '../../types/studentCourse'
import { Request } from '../../types/request'
import { getRequests } from '../../services/requestService'

interface ICourses {
    telephone: string;
    role: Role;
    email: string;
    type: 'all' | 'my';
    currentUserId: number;
    userFullName: string;
}

const Courses = ({ userFullName, role, type, currentUserId, telephone, email }: ICourses) => {

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);

    const [courses, setCourses] = React.useState<null | Course[] | StudentCourse[]>(null);
    const [requests, setRequests] = React.useState<null | Request[]>(null);
    console.log(requests)
    React.useEffect(() => {
        if(type === 'all'){
          getCourses(role, currentUserId)
          .then((data) => {
              setCourses(data)
          })
          .catch((data) => {
            setProcessMessage(data.response.data.message)
          })

          getRequests(role, currentUserId)
          .then((data) => setRequests(data))
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

          getRequests(role, currentUserId)
          .then((data) => setRequests(data))
          .catch((data) => {
            setProcessMessage(data.response.data.message)
          })
        }
      }, [])

    return (
        <>
        {
        !courses || !requests
        ?
        <>
        <BigLoader />
        {processMessage && <p className='message'>{processMessage}</p>}
        </>
        :
        courses.length === 0
        ?
        <>
        {role === 'admin' && <ActionLink href="/courses/create" name="Зарегистрировать курс"/>}
        <p className='message'>Курсов не существует</p>
        </>
        :
        <>
        {role === 'admin' && <ActionLink href="/courses/create" name="Зарегистрировать курс"/>}
        {
          type === 'all'
          ?
          <div className="list">
            {(courses as Course[]).map((el) => (
                requests && requests.find((req) => req.CourseId === el.id) && requests.find((req) => req.CourseId === el.id)?.UserId === currentUserId
                ?
                <CourseItem
                  dateStart={el.dateStart}
                  dateEnd={el.dateEnd}
                  userFullName={userFullName}
                  key={el.id}
                  courseHaveRequest={true}
                  telephone={telephone}
                  email={email}
                  UserId={currentUserId}
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
                :
                <CourseItem
                  dateStart={el.dateStart}
                  dateEnd={el.dateEnd}
                  userFullName={userFullName}
                  key={el.id}
                  courseHaveRequest={false}
                  telephone={telephone}
                  email={email}
                  UserId={currentUserId}
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
              courseHaveRequest={true}
              dateStart={el.Course.dateStart}
              dateEnd={el.Course.dateEnd}
              userFullName={userFullName}
              key={el.Course.id}
              telephone={telephone}
              email={email}
              UserId={currentUserId}
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