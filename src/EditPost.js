import React from 'react'
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from './api/posts';
import { format } from 'date-fns';

const EditPost = ({
    posts, setEditBody, setEditTitle, editBody, editTitle,setPosts
}) => {

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [post, setEditBody, setEditTitle])


    let navigate = useNavigate();
    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post=>post.id===id?{...response.data}:post));
            setEditBody('');
            setEditTitle('');
            navigate('/');
        } catch (err) {
            console.log(`Error ${err.message}`);
        }
    }

    return (
        <main className='NewPost'>
            {editTitle &&
            <>
      <h2>Edit Post</h2>
      <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='postTitle'>Title:</label>
        <input 
          id='postTitle'
          type='text'
          required
          value={editTitle}
          onChange={(e)=>setEditTitle(e.target.value)}
          />
          <label htmlFor='postBody'>Post:</label>
          <textarea
            id='postBody'
            required
            value={editBody}
            onChange={(e)=>setEditBody(e.target.value)}
            />
            <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
      </form>
      </>
            }
            {!editTitle&&
             <>
             <h2>Post Not Found</h2>
             <p>Well That's Disturbing</p>
             <Link to='/'>Visit out HomePage</Link>
           </>}
        </main>
    )
}

export default EditPost