import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarLoginUser from "./NavbarLoginUser";
const Savedpost = () => {
    const history = useHistory();
    const [postdata, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState();
    const [fname, setFname] = useState();
    useEffect(() => {

        const callHomePage = async () => {

            try {
                const res = await fetch("/userLogin", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })

                const data = await res.json();


                setFname(data.fname);
                setEmail(data.email);
                setUserData(data);



                console.log(data);
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;


                }
            }
            catch (err) {
                history.push("/");
                console.log(err);

            }

        }
        callHomePage();
        const showCards = async () => {


            try {



                const res = await fetch("/getsavedpost/" + email, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })

                const data = await res.json();

                setData(data);
                if (!res.status === 200) {
                    //   const error=new Error(res.error);
                    //   throw error;


                }
            }
            catch (err) {

                console.log(err);

            }

        }
        showCards();

    }, [email, history]);


    const likepost = async (id) => {
        try {
            const { _id } = userData;
            const add_id = _id;
            const post_id = id;
    
    
            await fetch("/like/" + email, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    post_id, add_id
                })
            });



            const res = await fetch("/getsavedpost/" + email, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();

            setData(data);
        }
        catch (err) {

            console.log(err);

        }

    }
    const deletesaved=async(id)=>{
        await fetch("/deletesaved/" + id, { method: 'DELETE' });
        try {



            const res = await fetch("/getsavedpost/" + email, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();

            setData(data);

        }
        catch (err) {

            console.log(err);

        }

    

    }
    return (
        <>
        <NavbarLoginUser Name={fname} />
            <div className="container w-100">


                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row gy-3 mt-3">
                            {

                                postdata.map((elem, index) => {
                                    const { fname, title, description, photo, _id, count,postid } = elem;
                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="card w-100" id="cardicons" style={{ width: "18rem" }}>
                                                <img src={photo} className="card-img-top" style={{ width: "100%" }} alt="..." />

                                                <div style={{ color: "white" }} className="row top-left mt-2 mx-auto">
                                                    <div style={{ zIndex: "1" }} className="col-9">
                                                        <b style={{ color: "yellow", fontWeight: "bolder", fontSize: "19px" }}>{fname}</b>
                                                    </div>


                                                </div>

                                                <div className="card-body">
                                                    <h5 className="card-title">{title}</h5>
                                                    <p className="card-text">{description}</p>
                                                    <div className="row">
                                                        <div className="col-6 justify-content-start align-items-center d-flex">
                                                            <i class="far fa-thumbs-up" data-bs-toggle="tooltip"  title="Like Post" onClick={() => likepost(postid)}></i>{count}
                                                        </div>
                                                        {/* <div className="col-3 justify-content-center align-items-center d-flex">
                                                            <i class="far fa-edit"> </i>
                                                        </div>

                                                        <div className="col-3 justify-content-center  d-flex">
                                                            <i class="fas fa-trash-alt"></i>
                                                        </div> */}
                                                        <div className="col-6 justify-content-end  d-flex">
                                                        <i class="fas fa-eraser" data-bs-toggle="tooltip"  title="Remove Saved" onClick={()=>deletesaved(_id)}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Savedpost;
