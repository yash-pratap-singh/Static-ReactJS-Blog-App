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
// import {BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aspernatur, dolorum iure qui iste eum."
    },
    {
      id: 2,
      title: 'Second Post',
      datetime: 'July 01, 2021 13:17:36 AM',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aspernatur, dolorum iure qui iste eum."
    },
    {
      id: 3,
      title: 'Third Post',
      datetime: 'July 01, 2021 06:11:56 PM',
      body: "Money Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aspernatur, dolorum iure qui iste eum."
    }
  ])



  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');


  useEffect(()=>{
    const filteredPosts= posts.filter(post=>
    (((post.body).toLowerCase()).includes(search.toLowerCase())) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase())  
    );

    setSearchResults(filteredPosts.reverse());
  },[posts,search])
  

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
