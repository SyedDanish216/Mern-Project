import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarLoginUser from "./NavbarLoginUser";
import axios from "axios";


const HomeLoginUser = () => {

    const [postId, setPostId] = useState([]);
    const [email, setEmail] = useState();

    const [user, setUser] = useState({
        title: "",
        description: "",
        photo: ""


    })
    const history = useHistory();
    const [userData, setUserData] = useState([]);
    const [postdata, setData] = useState([]);
    const [cont, setCont] = useState([]);

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
                //   console.log(res);
                setUserData(data);
                const {email}=data;
                setEmail(email);


                console.log(data);
                // if (!res.status === 200) {
                //     const error = new Error(res.error);
                //     throw error;


                // }
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
                // console.log(res);
                console.log(data);
                setData(data);
                data.map((el) => {
                    const {count } = el;
                   
                    setCont((oldcurrItems)=>{
           
                      
                       return [...oldcurrItems, count];
                        
                    });

                })
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
    }, [history]);

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const uploadImage = (e) => {
        e.preventDefault();
        setUser({ ...user, photo: e.target.files[0] });
        console.log(e.target.files[0]);

    }
    const PostData = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("fname", userData.fname);
        fd.append("title", user.title);
        fd.append("description", user.description);
        fd.append("photo", user.photo);
        fd.append("email", userData.email);

        const res = await axios.post('/createpost', fd)
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err);
            })



    }

    const likepost = async (id) => {
        setPostId(id);
        const { _id } = userData;
        const add_id = _id;
        const post_id = id;


        const res = await fetch("/like/" + email, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post_id, add_id
            })
        });

        const r = await fetch("/getData", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await r.json();

        setData(data);

    }

    const savedpost = async (elem) => {
      
     

        

        const fd = new FormData();
        fd.append("fname", elem.fname);
        fd.append("title", elem.title);
        fd.append("description", elem.description);
        fd.append("photo", elem.photo);
        fd.append("email", email);
        fd.append("postid", elem._id);
        fd.append("count", elem.count);
        
        try {
                
                    
            const res = await axios.post('/savedpost', fd)
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err);
            })
           
          
             if (!res.status === 200) {
                    const error=new Error(res.error);
                    throw error;


             }
         }
         catch (err) {

             console.log(err);

         }

    }

    return (
        <>

            <NavbarLoginUser Name={userData.fname} />




            <div className="container w-100">


                <div className="row">




                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row gy-3 mt-3">
                            {
                                postdata.map((elem,index) => {
                                    const { fname, title, description, photo, _id, count, likes } = elem;
                                 
                                   
                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="card w-100" id="cardicons" style={{ width: "18rem" }}>
                                                <img src={photo} className="card-img-top" style={{ width: "100%" }} alt="..." />

                                                <div style={{ color: "yellow" }} className="row top-left mt-2 mx-auto">
                                                    <div style={{ zIndex: "1" }} className="col-9">
                                                        <b>{fname}</b>
                                                    </div>


                                                </div>

                                                <div className="card-body">
                                                    <h5 className="card-title">{title}</h5>
                                                    <p className="card-text">{description}</p>
                                                    <div className="row">
                                                        <div className="col-6 ">
                                                            <i class="far fa-thumbs-up" data-bs-toggle="tooltip"  title="Like Post" onClick={() => likepost(_id)}></i>{count}
                                                            {/* <i class="far fa-thumbs-up"></i>{cont[index]} */}

                                                        </div>
                                                        <div className="col-6 justify-content-end align-items-center d-flex">
                                                            <i class="far fa-bookmark" data-bs-toggle="tooltip"  title="Save Post" onClick={()=>savedpost(elem)}></i>
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
export default HomeLoginUser;
