import React from 'react';
import Aside from './components/Aside/Aside';
import AsideOpenButton from './components/AsideOpenButton/AsideOpenButton';
import PageTitle from './components/PageTitle/PageTitle';
import MyCourseItem from './components/MyCourseItem/MyCourseItem';
import { CurrentLocation } from './types/currentLocation';
import Users from './screens/Users/Users';
import { useAppSelector } from './redux/redux-hooks';
import { user } from './redux/selectors';
import BigLoader from './components/BigLoader/BigLoader';
import Courses from './screens/Courses/Courses';

const App = () => {

  const { data, status } = useAppSelector(user);

  const location = localStorage.getItem('progame-location');

  const [asideIsOpened, setAsideIsOpened] = React.useState(true);
  const [currentLocation, setCurrentLocation] = React.useState<CurrentLocation>(location ? JSON.parse(location) : {id: 1, name: 'Мои курсы'});

  React.useEffect(() => {
    if(!data && status === 'rejected'){
      window.location.href = '/login'
    }else if(!data && status === 'idle'){
      window.location.href = '/login'
    }
  }, [data, status])

  if(data){
    return (
      <>
      <div className='wrapper'>
        <div className="asideWrapper">
          <Aside data={data} status={status} isOpened={asideIsOpened} setIsOpened={setAsideIsOpened} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
          <AsideOpenButton isOpened={asideIsOpened} setIsOpened={setAsideIsOpened} />
        </div>
        <div className={asideIsOpened ? 'mainContentActive' : 'mainContent'}>
          <div className="container">
            <PageTitle title={currentLocation.name}/>
            {currentLocation.id === 1 && <MyCourseItem />}
            {currentLocation.id === 2 && <Courses role='student' />}
            {currentLocation.id === 4 && <Users type='student' />}
            {currentLocation.id === 5 && <Users type='admin' currentUserId={data.id}/>}
            {currentLocation.id === 6 && <Courses role='admin' />}
          </div>
        </div>
      </div>
      </>
    )
  }else{
    return(
      <BigLoader />
    )
  }
}

export default App