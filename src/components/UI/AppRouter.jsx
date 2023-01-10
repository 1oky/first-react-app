import React, { useContext } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import { AuthContext } from '../../context';
import { publicRoutes, privateRoutes } from '../../routes';
import MyLoader from './Loader/MyLoader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)
  console.log(isAuth)
  if (isLoading) {
    return <MyLoader/>
  }
    return (
      isAuth
        ? <Routes>
            {privateRoutes.map(route =>
            <Route
              element={route.element}
              path={route.path}exact={route.exact}
              key={route.path}
              />
             )}
            <Route
              path="*"
              element={<Navigate to="/posts" replace />}></Route>
           </Routes>
        : <Routes>
           {publicRoutes.map(route =>
           <Route
            element={route.element}
            path={route.path}
            key={route.path}
            exact={route.exact}/>
            )}
            <Route
              path="*"
              element={<Navigate to="/login" replace />}></Route>
           </Routes> 
    );
};

export default AppRouter;