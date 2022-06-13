import React from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'

const PostPage = ({posts,setPosts}) => {

  const {id}=useParams();
  const post= posts.find(post=> (post.id).toString()===id);

  let navigat=useNavigate();
  const handleDelete=(id)=>{
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    navigat('/');
  }
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <button onClick={()=>handleDelete(post.id)}>Delete Post</button>
        </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well That's Disturbing</p>
            <Link to='/'>Visit out HomePage</Link>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage