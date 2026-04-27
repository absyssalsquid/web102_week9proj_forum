import {useState} from 'react'
import {useNavigate} from 'react-router'

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import PostForm from "../components/PostForm";
import Ribbon from "../components/Ribbon";

import {createPost} from '../utils.js'

const NewPost = () => {
    const userVars = useContext(UserContext);
    const [formData, setFormData] = useState({title: '', user_id: userVars.user_id, temporary_name: userVars.displayname});
    const [errorMsg, setErrorMsg] = useState('')
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        if(errorMsg) setErrorMsg('')
        var newFormData = {
            ...formData,
            [e.target.name]: e.target.value,
        }
        setFormData(newFormData)
    }

    const handleSubmitCreate = async (e)=>{
        e.preventDefault();
        const res = await createPost(formData)
        console.log(res)
        if (res.error) setErrorMsg(res.msg)
        else{
            setErrorMsg(res.msg)
            navigate("/");
        }
    }

    return (
        <div className='post-modify'>
            <Ribbon text='Write a manuscript'/>
            <form>
                <PostForm
                    formData={formData}
                    onChangeFn={handleChange}
                />
                <div>
                    <button onClick={handleSubmitCreate}>Submit</button>
                </div>
            </form>
            <div className='error-msg'>{errorMsg}</div>
        </div>
    )
}

export default NewPost;