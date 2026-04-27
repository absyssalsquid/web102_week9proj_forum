import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router';

import {fetchUserProfile} from '../utils.js'

const UserProfile = () => {
    const {user_id} = useParams()
    const [profileData, setProfileData] = useState({})

    useEffect(()=>{
        const fn = async () => {
            const data = await fetchUserProfile(user_id)
            setProfileData(data)
            console.log(data)
        }
        fn();
    },[])

    return(
        <div className='user-profile'>
            <div className='title'>
                <img className='hat' src={`/hats/${profileData.hat_name}.png`}></img>
                <div className='displayname'>{profileData.displayname}</div>
            </div>
            <div className='bio'>
                {profileData.bio}
            </div>
        </div>
    )
}

export default UserProfile