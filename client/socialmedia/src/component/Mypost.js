import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import NavbarLoginUser from "./NavbarLoginUser";
import axios from "axios";
const Mypost = () => {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [fname, setFname] = useState();
    const [postdata, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [editpost, seteditPost] = useState([]);
    const [user, setUser] = useState({
        title: "",
        description: "",
        photo: ""


    })



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

                const { email, fname } = data;
                 setUserData(data);
                setFname(fname);
                setEmail(email);
                seteditPost(null);
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
                const res = await fetch("/getData/" + email, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })

                const data = await res.json();

                console.log(data);
                setData(data);
        

            }
            catch (err) {

                console.log(err);

            }
        }
        showCards();
    }, [email, history]);



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
    const clearData = () => {
        setUser({ title: '', description: '', photo: 'null' });

    }
    const PostData = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("fname", fname);
        fd.append("title", user.title);
        fd.append("description", user.description);
        fd.append("photo", user.photo);
        fd.append("email", email);
        if (editpost === null) {
            await axios.post('/createpost', fd)
                .then((res) => console.log(res))
                .catch((err) => {
                    console.log(err);
                })



            const r = await fetch("/getData/" + email, {
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

        else {
            const { _id } = editpost;
            const res = await axios.put('/editpost/' + _id, fd)
                .then((res) => console.log(res))
                .catch((err) => {
                    console.log(err);
                })


            const r = await fetch("/getData/" + email, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await r.json();

            console.log(data);
            setData(data);

        }
    }

    const likepost = async (id) => {
    
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

        const r = await fetch("/getData/" + email, {
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
    const setField = (id) => {
        postdata.map((el) => {
            const { _id } = el;
            if (id === _id) {
                setUser(el);
                seteditPost(el);
            }
        })

    }

    const deleteData = async (id) => {
        const res = await fetch("/deletepost/" + id, { method: 'DELETE' });

        const r = await fetch("/getData/" + email, {
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
            <NavbarLoginUser Name={fname} />
            <div className="container-fluid w-100">


                <div className="row">

                    <div className="col-lg-4 col-sm-12 mt-4">

                        <div className="row gy-3 justify-content-center align-items-center mx-auto text-center align-self-center my-auto"
                            style={{ border: "1px solid grey", borderRadius: "16px" }}>

                            <div className="my-auto">
                                <b className="align-self-center" style={{ fontSize: "24px" }}>Create a Post</b>
                            </div>
                            <form method="POST" encType="multipart/form-data">

                                <div className="mb-3">
                                    <input type="text" name="title" className="form-control" value={user.title} onChange={handleInputs} placeholder="Title" />
                                </div>
                                <div className="mb-3" >
                                    <textarea rows="5" type="text" name="description" value={user.description} onChange={handleInputs} className="form-control" placeholder="Description" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Upload Image</span>
                                    <input type="file" name="photo" onChange={uploadImage}

                                        className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <button type="submit" name="submit" className="form-control form-submit btn btn-primary" onClick={PostData}>Submit</button>
                                </div>
                                <div className="mb-3">
                                    <div className="form-control btn-danger clearbtn" onClick={clearData}>Clear </div>
                                </div>



                            </form>
                        </div>


                    </div>

                    <div className="col-lg-8 col-md-12 col-sm-12">
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
                                                        <b style={{ color: "yellow", fontWeight: "bolder", fontSize: "19px" }}>{fname}</b>
                                                    </div>


                                                </div>

                                                <div className="card-body">
                                                    <h5 className="card-title">{title}</h5>
                                                    <p className="card-text">{description}</p>
                                                    <div className="row">
                                                        <div className="col-3 justify-content-start align-items-center d-flex">
                                                            <i class="far fa-thumbs-up" data-bs-toggle="tooltip"  title="Like Post" onClick={() => likepost(_id)}></i>{count}
                                                        </div>
                                                        <div className="col-3 justify-content-center align-items-center d-flex">
                                                            <i class="far fa-edit" data-bs-toggle="tooltip"  title="Edit Post" onClick={() => setField(_id)}> </i>
                                                        </div>

                                                        <div className="col-3 justify-content-center  d-flex">
                                                            <i class="fas fa-trash-alt" data-bs-toggle="tooltip"  title="Delete Post" onClick={() => deleteData(_id)}></i>
                                                        </div>
                                                        <div className="col-3 justify-content-end  d-flex">
                                                            <i class="far fa-bookmark " data-bs-toggle="tooltip"  title="Save Post" onClick={()=>savedpost(elem)}></i>
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
export default Mypost;
