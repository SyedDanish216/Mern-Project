
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { useHistory } from "react-router-dom";
const Socialmediafront = () => {
    const history = useHistory();
    const [userData, setUserData] = useState([]);
    const [postdata, setData] = useState([]);
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

                setUserData(data);

            }
            catch (err) {
                history.push("/");
                console.log(err);

            }

        }
        callHomePage();
        const showCards = async () => {

            try {
                const res = await fetch("/getData", {
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
        showCards();
    }, [history]);
    const likepost = () => {
        alert("You must login first to like a post");
    }
    const savedpost = () => {
        alert("You must login first to save a post");
    }

    return (
        <>
            <Navbar />

            <div className="container">


                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row gy-3 mt-3">
                            {
                                postdata.map((elem, index) => {
                                    const { fname, title, description, photo, _id, count, likes } = elem;


                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="card w-100" id="cardicons" style={{ width: "18rem" }}>
                                                <img src={photo} className="card-img-top" style={{ width: "100%" }} alt="..." />

                                                <div style={{ color: "white" }} className="row top-left mt-2 mx-auto">
                                                    <div style={{ zIndex: "1" }} className="col-9">
                                                        <b>{fname}</b>
                                                    </div>


                                                </div>

                                                <div className="card-body">
                                                    <h5 className="card-title">{title}</h5>
                                                    <p className="card-text">{description}</p>
                                                    <div className="row">
                                                        <div className="col-6 ">
                                                            <i className="far fa-thumbs-up" data-bs-toggle="tooltip"  title="Like Post" onClick={() => likepost()}></i>{count}
                                                            {/* <i class="far fa-thumbs-up"></i>{cont[index]} */}

                                                        </div>
                                                        <div className="col-6 justify-content-end align-items-center d-flex">
                                                            <i class="far fa-bookmark" data-bs-toggle="tooltip"  title="Save Post" onClick={() => savedpost()}></i>
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

export default Socialmediafront;
