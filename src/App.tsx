import React from 'react';
import Aside from './components/Aside/Aside';
import AsideOpenButton from './components/AsideOpenButton/AsideOpenButton';
import PageTitle from './components/PageTitle/PageTitle';
import MyCourseItem from './components/MyCourseItem/MyCourseItem';
import { CurrentLocation } from './types/currentLocation';
import AvailableCourseItem from './components/AvailableCourseItem/AvailableCourseItem';

const App = () => {

  const location = localStorage.getItem('progame-location');

  const [asideIsOpened, setAsideIsOpened] = React.useState(true);
  const [currentLocation, setCurrentLocation] = React.useState<CurrentLocation>(location ? JSON.parse(location) : {id: 1, name: 'Мои курсы'});

  return (
    <>
    <div className='wrapper'>
      <div className="asideWrapper">
        <Aside isOpened={asideIsOpened} setIsOpened={setAsideIsOpened} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
        <AsideOpenButton isOpened={asideIsOpened} setIsOpened={setAsideIsOpened} />
      </div>
      <div className={asideIsOpened ? 'mainContentActive' : 'mainContent'}>
        <div className="container">
          <PageTitle title={currentLocation.name}/>
          {currentLocation.id === 1 && <MyCourseItem />}
          {currentLocation.id === 2 && <AvailableCourseItem />}
        </div>
      </div>
    </div>
    </>
  )
}

export default App