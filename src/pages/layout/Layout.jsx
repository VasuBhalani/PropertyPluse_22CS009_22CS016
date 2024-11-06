import './layout.scss';
import Navbar  from '../../components/nav/Nav.jsx';
import { Outlet,Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext.jsx';
function Layout() {

return(
<div className="layout">
      <div className="navbar">
      <Navbar/>
      </div>
      <div className="content">
      <Outlet/>
      </div>
    </div>
);
}

function RequireAuth() {
  const {currentUser} = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }else{
    return(
       <div className="layout">
        <div className="navbar">
        <Navbar/>
        </div>
        <div className="content">
        <Outlet/>
        </div>
      </div>
    );
  }
}

export {Layout,RequireAuth};