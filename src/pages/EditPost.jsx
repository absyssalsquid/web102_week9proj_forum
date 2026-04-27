import {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router';

import Ribbon from "../components/Ribbon";
import PostForm from "../components/PostForm";

import { fetchPost } from '../utils'

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import {deletePost, updatePost} from '../utils.js'


const EditPost = () => {
    const userVars = useContext(UserContext);
    const {post_id} = useParams()
    const [formData, setFormData] = useState({});
    const [postChanges, setPostChanges] = useState({temporary_name: userVars.displayname}); // if user changes display name
    const navigate = useNavigate();

    useEffect(()=>{
        const fn = async () =>{
            const data = await fetchPost(post_id)   
            setFormData(data);
            setPostChanges({id: post_id})
        }
        fn();
    }, [])


    const handleChange = (e) => {
        var newFormData = {
            ...formData,
            [e.target.name]: e.target.value,
        }

        var newPostChanges = {
            ...postChanges,
            [e.target.name]: e.target.value,
        }
        setFormData(newFormData)
        setPostChanges(newPostChanges)
    }

    const handleSubmitUpdate = async (e)=>{
        e.preventDefault();
        console.log(postChanges)
        const res = await updatePost(postChanges)
        if (!res.error)
            navigate(`/post/${post_id}`)
    }
    const handleSubmitDelete = async (e)=>{
        e.preventDefault();
        await deletePost(post_id)
        navigate("/");
    }
    

    const bannerText = 'Edit your manuscript'
    if (!formData) return (<Ribbon text="Manuscript not found"/>)
    else if (!formData.user_id || formData.user_id != userVars.user_id) return (<Ribbon text="You can't edit a manuscript that isn't yours!"/>)
    return (
        <div className='post-modify'>
            <Ribbon text={bannerText}/>
            <form>
                <PostForm
                    formData={formData}
                    onChangeFn={handleChange}
                />
                <div>
                    <button onClick={handleSubmitUpdate}>Submit</button>
                    <button onClick={handleSubmitDelete} className='delete'>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;