import React, { createContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";


const Name=createContext();
const NavbarLoginUser = (props) => {
  
    return (
        <>
        <Name.Provider value={props.Name}></Name.Provider>
            <nav className="navbar navbar-expand-lg navbar-light" style={{background:"#410093"}}>
                <div className="container-fluid">



                    <div className="navbar-brand" href="#"><div className="headdiv d-flex flex-lg-row flex-md-column mx-auto">

                        <div className="mx-lg-5 mx-sm-0">Share Your Moments</div>
                        <div className="mx-5"><i className="fas fa-globe"></i></div>

                    </div></div>

                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active LSH" aria-current="page" to="/LoginUser" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active LSH " aria-current="page" to="userProfile"><i className="far fa-user-circle mx-auto my-auto" style={{lineHeight:"10px",fontSize:"26px"}}></i> {props.Name}</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link LSH" to="/mypost">My Posts</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link LSH" to="/savedpost">Saved Posts</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link LSH" to="/logout">Logout</NavLink>
                            </li>
                         
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
export default NavbarLoginUser;
export {Name};
