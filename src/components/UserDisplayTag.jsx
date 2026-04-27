import { Link } from 'react-router'
import { useEffect } from 'react';
const UserDisplayTag = ({userDisplayData, isInline=false}) => {

    useEffect(()=>{
        console.log(userDisplayData)
    },[])

    return(
        <div className='user-display-tag' style={isInline ? {display: 'inline-flex'}: {}}>
            <img className='hat' src={`/hats/${userDisplayData.hat_name}.png`}></img>
            {
                userDisplayData.display_id ?
                <Link to={`/user/${userDisplayData.display_id}`}>{userDisplayData.displayname}</Link> : 
                <span>{userDisplayData.displayname}</span>
            }
        </div >
    )
}

export default UserDisplayTag