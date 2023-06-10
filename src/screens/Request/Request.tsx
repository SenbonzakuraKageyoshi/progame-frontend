import React from 'react'
import { Request as RequestType } from '../../types/request'
import BigLoader from '../../components/BigLoader/BigLoader';
import { Role } from '../../types/role';
import { getRequests } from '../../services/requestService';
import RequestItem from '../../components/RequestItem/RequestItem';

interface IRequest {
    role: Role;
    currentUserId: number;
}

const Request = ({ role, currentUserId }: IRequest) => {

    const [processMessage, setProcessMessage] = React.useState<null | string>(null);
    const [requests, setRequests] = React.useState<null | RequestType[]>(null);

    React.useEffect(() => {
        getRequests(role, currentUserId)
        .then((data) => setRequests(data))
        .catch((data) => setProcessMessage(data.response.data.message))
    }, [])

    return(
        !requests
        ?
        <>
        <BigLoader />
        {processMessage && <p className='message'>{processMessage}</p>}
        </>
        :
        requests.length === 0
        ?
        <p className="message">Заявок не существует</p>
        :
        <div className="list">
            {requests.map((el) => (
                <RequestItem
                    setRequests={setRequests}
                    key={el.createdAt}
                    role={role}
                    id={el.id}
                    text={el.text}
                    telephone={el.telephone}
                    email={el.email}
                    createdAt={el.createdAt}
                    status={el.status}
                    authorName={el.authorName}
                />
            ))}
        </div>
    )
}

export default Request