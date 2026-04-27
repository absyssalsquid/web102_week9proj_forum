
import {Link} from 'react-router'
import UserDisplayTag from './UserDisplayTag';
import PostHeader from './PostHeader'

const PostTile = ({postData, handleClickLike}) => {
    return(
        <div className="post tile">
            <PostHeader postData={postData} isTile={true}/>

            {postData.image_url && <img src={postData.image_url}/>}

            <div className='post-footer'>
                <div className="likes">
                    <span className="like-icon" onClick={handleClickLike}>❤</span> 
                    <span className='like-count'>{postData.likes}</span>
                </div>
            </div>
        </div>
    )
}

export default PostTile;