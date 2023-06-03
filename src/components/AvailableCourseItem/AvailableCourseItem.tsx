import React from 'react'

const AvailableCourseItem = () => {
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
        <a href="" className="cardButton">Подать заявку</a>
        <a href="" className="cardButton">Расписание</a>
    </div>
  )
}

export default AvailableCourseItem