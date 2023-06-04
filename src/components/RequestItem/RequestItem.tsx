import React, { SetStateAction, Dispatch } from 'react'
import { Role } from '../../types/role';
import { Request, RequestStatus } from '../../types/request';
import { editRequestStatus, removeRequest } from '../../services/requestService';

type IRequestItem = {
    role: Role;
    setRequests: Dispatch<SetStateAction<null | Request[]>>; 
} & Omit<Request, 'updatedAt' | 'UserId' | 'CourseId'>;

const RequestItem = (props: IRequestItem) => {

    const [isStatusChanged, setIsStatusChanged] = React.useState(props.status !== 'На рассмотрении' ? true : false);

    const onChangeStatusHandler = (status: RequestStatus) => {
        editRequestStatus(status, props.id)
        .then(() => setIsStatusChanged(true))
    };

    const onRemoveHndler = () => {
        removeRequest(props.id)
        .then(() => props.setRequests((prev) => prev!.filter((el) => el.id !== props.id)))
    }

  return (
    <div className="card">
        <div className="cardName">{props.text}</div>
        <ul className="cardItemsList">
            <li>
                Статус: {props.status}
            </li>
            {
            props.role === 'admin'
            &&
            <>
            <li>
            Отправитель: {props.authorName}
            </li>
            <li>
                Телефон: {props.telephone}
            </li>
            <li>
                Email: {props.email}
            </li>
            </>
            }
            <li>
                Дата получения: {new Date(props.createdAt).toLocaleDateString()}
            </li>
        </ul>
        {!isStatusChanged && <button onClick={() => onChangeStatusHandler('Принята')} className="cardButton">Принять</button>}
        {!isStatusChanged && <button onClick={() => onChangeStatusHandler('Отклонена')}  className="cardButton" style={{background: 'var(--red)'}}>Отклонить</button>}
        {props.role === 'admin' &&  <button onClick={onRemoveHndler} className="cardButton" style={{background: 'var(--red)'}}>Удалить</button>}
    </div>
  )
}

export default RequestItem