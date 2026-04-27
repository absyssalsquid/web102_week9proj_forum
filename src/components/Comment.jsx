
import {userDisplayDataFromPostData} from '../utils';
import UserDisplayTag from '/src/components/UserDisplayTag';

const Comment = ({commentData}) => {
    const date = new Date(commentData.created_at)
    const userDisplayData = userDisplayDataFromPostData(commentData)
    
    return (
        <div className="comment">
            <div>
                <UserDisplayTag userDisplayData={userDisplayData} isInline={true}/>
                <span className="date">{date.toUTCString()}</span>
            </div>
            <div>{commentData.body}</div>
        </div>
    )
}

export default Comment