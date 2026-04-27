import { useEffect } from 'react'
import { useRoutes, Link } from 'react-router'

import Feed from './pages/Feed'
import Post from './pages/Post'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import SignIn from './pages/SignIn'
import UserProfile from './pages/UserProfile'
import UserDisplayTag from "./components/UserDisplayTag";

import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import {signOut} from '/src/utils.js'

import './App.css'

function App() {
  const userVars = useContext(UserContext);

  useEffect(() => {
    console.log("App loaded")
    console.log("user id", userVars.userId)
  }, [])

  const element = useRoutes([
    {path: "/"            , element: <Feed/>},
    {path: "new/"         , element: <NewPost/>},
    {path: "signin/"      , element: <SignIn/>},
    {path: "post/:post_id" , element: <Post/>},
    {path: "edit/:post_id" , element: <EditPost/>},
    {path: "user/:user_id" , element: <UserProfile/>},
  ]);

  return (
    <>
      <div className='navbar'>
        <Link to='/'    className='logo'>The Scriptorium</Link>
        <Link to='/'    className='navbar-item'>Home    </Link>
        <Link to='/new' className='navbar-item'>New Post</Link>
        
        <div className='flex-growable'></div>
        
        {
          ! userVars.user_id ? 
          <Link to='/signin' className='navbar-item'>Sign in</Link> :
          (
            <>
              {/* <div className='user-info'>
                <div className='userid'>{userVars.user_id}</div>
              </div> */}
              <UserDisplayTag userDisplayData={userVars}/>
              <div className='sign-out' onClick={signOut}>Sign out</div>
            </>
          )
        }
      </div>

      <div className='page'>
        {element}
      </div>
    </>
  )
}

export default App;
