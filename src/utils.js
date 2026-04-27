import { supabase } from './client'
import bcrypt from 'bcryptjs';

export const updateDbLikes = async (post_id, newLikes) =>{
    await supabase
        .from('posts')
        .update({'likes': newLikes})
        .eq('id', post_id)
}

export const updatePost = async (postData) =>{
    const res = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postData.id)
    return res
}

export const createPost = async (postData) => {
    console.log(postData)
    // check data is ok before submitting
    if (postData == {}) return {error: true, msg: 'Post must content'}
    if (!postData.title) return {error: true, msg: 'Post must have a title'}
    
    const res = await supabase
        .from('posts')
        .insert(postData)
        .select()

    console.log(res.data)
    if (res.error) return {error: true, msg: 'Error in post submission'}
    return {error: false, msg: 'Post successfully submitted'}
}

export const deletePost = async(post_id) => {
    await supabase
        .from('posts')
        .delete()
        .eq('id', post_id)
}

export const createComment = async(commentData) => {
    const res = await supabase
        .from('comments')
        .insert(commentData)
        .select(`
            *, 
            users(
                displayname,
                hats(hat_name)
            )
        `)
    console.log(res)
    return res.data[0]
}

export const fetchUserProfile = async (display_id) => {
    const {data} = await supabase
        .from('users')
        .select(`
            *,
            hats(hat_name)
        `)
        .eq('display_id', display_id)

    data[0].hat_name = data[0].hats.hat_name
    return data[0]
}

export const fetchContextData = async (user_id) => {
    const defaultUser = {display_id: null, displayname: 'Anonymous', hat_name: 'brown'}

    const res = await supabase
        .from('users')
        .select(`
            user_id,
            displayname,
            hats(hat_name)
        `)
        .eq('user_id', user_id)
    
    if(!res.error && res.data.length==1) {
        return {
            user_id: res.data[0].user_id, 
            displayname: res.data[0].displayname, 
            hat_name: res.data[0].hats.hat_name
        }
    }
    else {
        return defaultUser
    }
}

export const fetchUserDisplayData = async (display_id) => {
    const defaultUser = {display_id: null, displayname: 'Anonymous', hat_name: 'brown'}

    if (display_id == null){
        // console.log("fetchUserDisplayData: display_id is null")
        return defaultUser
    }
    // console.log("fetchUserDisplayData: display_id=", display_id)
    const {data} = await supabase
        .from('users')
        .select(`
            display_id,
            displayname,
            hats(hat_name)
        `)
        .eq('display_id', display_id)

    if (data.length==1) {
        // console.log("fetchUserDisplayData:", data[0])
        return {
            display_id: data[0].display_id, 
            displayname: data[0].displayname, 
            hat_name: data[0].hats.hat_name
        }
    }
    else {
        // console.log("fetchUserDisplayData: user not found")
        return defaultUser
    }
}

export const fetchPosts = async () =>{
    console.log("fetchPosts:", "fetching all posts")
    const {data} = await supabase
        .from('posts')
        .select(`
            *,
            users(
                displayname,
                display_id,
                hats(hat_name)
            )
        `)
        .order('created_at', { ascending: false })

    console.log("fetchPosts:", data)
    return data
}

export const fetchPost = async (post_id) =>{
    if (post_id == null) {
        console.log("fetchPost: post_id is null")
        return {}
    }
    console.log("fetchPost: post_id =", post_id)
    const {data} = await supabase
        .from('posts')
        .select()
        .select(`
            *,
            users(
                displayname,
                display_id,
                hats(hat_name)
            )
        `)
        .eq('id', post_id)
    
    if (data.length==1) {
        // console.log("fetchPost:", data[0])
        return data[0]
    }
    else {
        // console.log("fetchPost: post not found")
        return {}
    }
}

export const fetchComments = async (post_id) =>{
    if (post_id == null) {
        console.log("fetchPost: post_id is null")
        return {}
    }
    console.log("fetchComments: post id=", post_id)
    const {data} = await supabase
        .from('comments')
        .select(`
            *,
            users(
                displayname,
                display_id,
                hats(hat_name)
            )
            `)
        .eq('post_id', post_id)
        .order('created_at')

    console.log("fetchComments:", data)
    return data
}

export const userDisplayDataFromPostData = (postData) => {
    return {
        display_id:  postData.users? postData.users.display_id : null,
        displayname: postData.users ? postData.users.displayname : postData.temporary_name,
        hat_name:     postData.users && postData.users.hats ? postData.users.hats.hat_name : "brown"
    }
}

export const signOut = () => {
    supabase.auth.signOut();
    localStorage.clear();
    window.location.reload()
}

export const signIn = () => {

}

export const validatePassword = async ({displayname, passwordAttempt}) =>{

    if (!displayname){
        return {error: true, msg: "You need a username!"}
    }
    const res = await supabase.from('users')
        .select()
        .eq('displayname', displayname)
    
    if (res.data.length == 0) return {error: true, msg: "Could not find user"}

    const pwIsValid = await bcrypt.compare(passwordAttempt, res.data[0].pw_hash);
    if (pwIsValid) {
        localStorage.setItem("pseudo_user_id", res.data[0].user_id);
        return {error: false, msg: "Login successful. You will be redirected shortly."}
    }
    else{
        return {error: true, msg: "Password does not match"}
    }
}

export const register = async ({displayname, passwordAttempt}) => {
    var generatedHash = await bcrypt.hash(passwordAttempt, 12);

    // validation
    const isAlphanumeric = /^[a-z0-9]+$/i.test(displayname);
    if (!isAlphanumeric) return{ error: true, msg: "Username must be alphanumeric"}
    if (!passwordAttempt) return{ error: true, msg: "You need a password"}
    if(displayname.length > 30) return{ error: true, msg: "Username must be 30 characters or less"}
    const { data } = await supabase.from('users')
        .select()
        .eq('displayname', displayname)
        .maybeSingle();
    if (data) return{error: true, msg: "Username already exists"}
    
    const auth_res = await supabase.auth.signInAnonymously();
    if (auth_res.error) return{error: true, msg: "Could not generate auth token"}
    console.log(auth_res.data.user.id)
    const res = await supabase.from('users')
        .insert({
            user_id: auth_res.data.user.id,
            displayname: displayname,
            pw_hash: generatedHash
        })
        .select()

    if (!res.error) {
        localStorage.setItem("pseudo_user_id", res.data[0].user_id);
        return {error: false, msg: "Registration successful. You will be redirected shortly."}
    }
    else{
        return {error: true, msg: "Registration error. Try again."}
    }
}
