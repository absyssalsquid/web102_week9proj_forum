import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import './PostForm.css'
import UserDisplayTag from "./UserDisplayTag";

const PostForm = ({formData, onChangeFn}) => {
    const userVars = useContext(UserContext);

    return (
        <div className="form-input-container">
            <input 
                name="title" 
                className="title" 
                placeholder="Title"
                value={formData.title}
                onChange={onChangeFn}
            />
            <input 
                name="image_url"
                className="image-url" 
                placeholder="image url (optional)"
                value={formData.image_url}
                onChange={onChangeFn}
            />
            <textarea
                name="body"
                className="body-text" 
                placeholder="Say something! (optional)"
                value={formData.body}
                onChange={onChangeFn}
            />
            <div className="form-input-container-footer">
                {
                    // if not context var exists, or anonymous box is checked
                    !userVars.user_id ?
                    (
                        <>
                            <label for="temporary_name" >Posting as unregistered user</label>
                            <input 
                                className="temporary-name" 
                                id="temporary_name" 
                                name="temporary_name" 
                                placeholder="Anonymous"
                                value={formData.userName}                        
                                onChange={onChangeFn}
                            />
                        </>
                    )
                    :                        
                    (<UserDisplayTag userDisplayData={userVars}/>)
                }
            </div>
        </div>
    )
} 

export default PostForm;