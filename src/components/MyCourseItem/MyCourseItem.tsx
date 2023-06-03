import React from 'react'

const MyCourseItem = () => {
  return (
    <div className="card">
        <div className="cardName">Робототехника</div>
        <ul className="cardItemsList">
            <li>
                Статус: <div>Не начат</div>
            </li>
            <li>
                Статус: <div>Не начат</div>
            </li>
            <li>
                Статус: <div>Иванов Иван Иванович</div>
            </li>
            <li>
                Статус: <div>Не начат</div>
            </li>
            <li>
                Статус: <div>Не начат</div>
            </li>
        </ul>
        <a href="" className="cardButton">Подробнее</a>
        <a href="" className="cardButton">Расписание</a>
    </div>
  )
}

export default MyCourseItem