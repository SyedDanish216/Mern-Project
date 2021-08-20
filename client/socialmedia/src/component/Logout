import React from "react";
import { useState } from "react";
import {useHistory} from "react-router-dom";
import Navbar from './Navbar';
const Login = () =>{
    const history=useHistory();
    const [user,setUser]=useState({
        name:"",
        cpassword:""
        
    })
    let name,value;
    const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }
    const PostData = async(e)=>{
        e.preventDefault();
        const {email,password}=user;


        const res=await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });
        //const data =await res.json();
        if(res.status===400)
        {
            window.alert("Invalid Credentials")
        }
        else if(res.status===422)
        {
            window.alert("Fill all fields");
        }
      
        else{
            window.alert("Signin successfully");
            history.push("/LoginUser");
        }

        
    }
    return(
    <>
    <Navbar />
      <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="align-self-center justify-content-center text-center fs-3">Login</div>
        </div>
        </div>
        <div className="row mx-auto justify-content-center">
       
      <div className="col-lg-3 col-md-6 col-sm-12">
            <form className="py-4">
               
                <div className="mb-3">
                    <input type="text" name="email" className="form-control" value={user.email} onChange={handleInputs} placeholder="Your Email" />
                </div>
                
                <div className="mb-3" >
                    <input rows="5" type="password" name="password" value={user.password} onChange={handleInputs} className="form-control" placeholder="Your Password" />
                </div>
              


                <div className="mb-3">
                    <button type="submit" name="login" className="form-control form-submit btn btn-primary" onClick={PostData}>Login</button>
                </div>




            </form>
            </div>
            </div>
            </div>
    </>
    )
}
export default Login;
