import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import {ReactComponent as CompLogo} from '../../assets/logo.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to='/'>
            <CompLogo className='logo' />
        </Link>
          
          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
                SHOP
            </Link>
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
  };

export default Navigation;