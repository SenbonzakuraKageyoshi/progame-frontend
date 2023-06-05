import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux/es/exports';
import store from './redux/store';
import './styles/globals.scss';
import Login from './Pages/Login/Login';
import CreateUser from './Pages/CreateUser/CreateUser';
import { getMe } from './redux/userSlice/userSlice';
import { getToken } from './utils/token';
import EditUser from './Pages/EditUser/EditUser';
import CourseCreate from './Pages/CourseCreate/CourseCreate';
import CourseEdit from './Pages/CourseEdit/CourseEdit';
import CourseMembers from './Pages/CourseMembers/CourseMembers';
import CourseDetails from './Pages/CourseDetails/CourseDetails';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/students/create',
    element: <CreateUser type="student"/>
  },
  {
    path: '/admins/create',
    element: <CreateUser type="admin"/>
  },
  {
    path: '/users/edit/:id',
    element: <EditUser />
  },
  {
    path: '/courses/create',
    element: <CourseCreate />
  },
  {
    path: '/courses/edit/:id',
    element: <CourseEdit />
  },
  {
    path: '/courses/members/:id',
    element: <CourseMembers />
  },
  {
    path: '/courses/details/:id',
    element: <CourseDetails />
  },
]);

if(getToken()){
  store.dispatch(getMe())
}else if(!getToken() && window.location.pathname !== '/login'){
  window.location.href = '/login'
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);