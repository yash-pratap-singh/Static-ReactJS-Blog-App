import Home from './Home';
import About from './About';
// import Profile from './Profile';
// import ErrorPage from './ErrorPage';


import Header from './Header';
import Nav from './Nav.js';
import Footer from './Footer';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import EditPost from './EditPost';
// import {BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import api from './api/posts';

function App() {

  const [posts, setPosts] = useState([]);



  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]=useState('');


  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        console.log(response);
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error ${err.message}`);
        }
      }
    }

    fetchPosts();
  },[])

  useEffect(() => {
    const filteredPosts = posts.filter(post =>
      (((post.body).toLowerCase()).includes(search.toLowerCase())) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    );

    setSearchResults(filteredPosts.reverse());
  }, [posts, search])


  return (
    <div className='App'>
      <Router>
        <Header title="React JS Blog" />
        <Nav search={search} setSearch={setSearch} />
        <Routes>
          <Route path='/' element={< Home posts={searchResults} />} />
          <Route path='/post' element={<NewPost
            posts={posts}
            setPosts={setPosts}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path='/edit/:id' element={<EditPost
            posts={posts}
            setPosts={setPosts}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />} />
          <Route path='/post/:id' element={<PostPage posts={posts} setPosts={setPosts} />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </Router>
    </div>










    // <Router>
    //   <nav>
    //     <Link to='/'>Home</Link>
    //     <Link to='/about'>About</Link>
    //     <Link to='/profile'>Profile</Link>
    //   </nav>
    //   <Routes>
    //     <Route path='/' element={<Home/>}/>
    //     <Route path='/about' element={<About/>}/>
    //     <Route path='/profile/:username' element={<Profile/>}/>
    //     <Route path='*' element={<ErrorPage/>}/>
    //   </Routes>
    // </Router>
  );
}

export default App;
