
import {useState, useEffect} from 'react'
import { fetchPosts, updateDbLikes } from '../utils'

import PostTile from '../components/PostTile'

const Feed = () =>{
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchText, setSearchText] = useState('')
    const [sortBasis, setSortBasis] = useState('created_at')
    
    useEffect(()=>{
        const fn = async () =>{
            const data = await fetchPosts();
            setPosts(data);
            setFilteredPosts(data);
        }
        fn();
    }, [])

    // descending order
    const fn_popularity = (a,b) => b['likes'] - a['likes']
    const fn_latest = (a,b) => {
        return new Date(b['created_at']) - new Date(a['created_at'])
    }

    useEffect(()=>{
        function fn(){
            var newFilteredPosts = !searchText ? [...posts] : posts.filter((item) => {
                return item.title.toLowerCase().includes(searchText.toLowerCase())
            })
            newFilteredPosts = newFilteredPosts.sort(
                sortBasis == 'created_at' ? 
                fn_latest :
                fn_popularity
            );
            setFilteredPosts(newFilteredPosts)
        }
        fn()
    },[searchText, sortBasis, posts])

    const incrementLikes = async (post_id, newLikes) =>{

        // update db
        updateDbLikes(post_id, newLikes)
        
        // update front end
        var new_posts = [...posts]
        new_posts.map((item) => {
            if (item.id == post_id)
                item.likes = newLikes
        })
        setPosts(new_posts);
    }

    return(
        <div className='feed'>
            <div className='feed-search'>
                <label for=''>Search</label>
                <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} className='flex-growable'/>
                <label for=''>Sort by</label>
                <select id='order-by' name='order-by' defaultValue='created_at' onChange={(e)=>setSortBasis(e.target.value)}>
                    <option value='created_at'>Latest</option>
                    <option value='likes'>Popularity</option>
                </select>
            </div>

            <div className='tile-container'>
                {filteredPosts.map((item) => {
                    return(
                        <PostTile
                            id={item.id}
                            key={item.id}
                            postData={item}
                            handleClickLike={()=>incrementLikes(item.id, item.likes+1)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Feed; 