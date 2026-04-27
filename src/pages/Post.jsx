import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router';

import Comment from '/src/components/Comment';
import CommentForm from '../components/CommentForm';
import PostHeader from '../components/PostHeader'

import { updateDbLikes, fetchPost, fetchComments, createComment} from '../utils';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Post = () => {
    const userVars = useContext(UserContext);
    const {post_id} = useParams()
    const [postData, setPostData] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')


    useEffect(()=>{
        const fn = async () =>{
            const data = await fetchPost(post_id)
            setPostData(data);

            const comm = await fetchComments(post_id)
            setComments(comm)
        }
        fn();
    }, [])

    const handleClickLike = () => {
        updateDbLikes(post_id, postData.likes + 1)
        setPostData((prev) => {
            return {
                ...prev,
                likes: prev.likes + 1
            }
        })
    }

    function handleCommentChange(e){
        setComment(e.target.value)
    }

    async function submitComment(e){
        e.preventDefault()
        if (!comment) return;
        const newComment = await createComment({
            post_id: post_id,
            user_id: userVars.user_id,
            body: comment,
            temporary_name: userVars.displayname
        })
        setComment('')
        setComments([...comments, newComment])
    }

    return (
        <>
            <div className='post'>
                <PostHeader postData={postData}/>

                {postData.body && <div className="body-text">{postData.body}</div>}
                {postData.image_url && <img src={postData.image_url}/>}

                <div className='post-footer'>
                    <div className="likes">
                        <span className="like-icon" onClick={handleClickLike}>❤</span> 
                        {postData.likes}
                    </div>

                    {
                        (postData.user_id && postData.user_id == userVars.user_id) && 
                        <div className='edit'><Link to={`/edit/${post_id}`}>Edit</Link></div>
                    }
                </div>
            </div>

            <div className='comment-section'>
                {
                    comments.length == 0 ? 
                    (<div style={{color:'white'}}>No comments yet.</div>) : 
                    comments.map((item) => <Comment key={item.id} commentData={item} />)
                }
            </div>

            <CommentForm
                value={comment} 
                onChange={handleCommentChange}
                onSubmit={submitComment}
            />
        </>
    )
}

export default Post;