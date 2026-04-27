
import {Link} from 'react-router'
import UserDisplayTag from './UserDisplayTag';
import {userDisplayDataFromPostData} from '/src/utils.js'

const PostTile = ({postData, isTile=false}) => {
    
    const date = new Date(postData.created_at)
    const userDisplayData = userDisplayDataFromPostData(postData)

    return(
        <div className='post-header'>
            { isTile?
                <Link className="title" to={`post/${postData.id}`}>{postData.title}</Link> :
                <div className="title">{postData.title}</div>
            }
            <UserDisplayTag userDisplayData={userDisplayData}/>
            <div className="date">{date.toUTCString()}</div>
        </div>
    )
}

export default PostTile;