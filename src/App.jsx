import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
import Footer from "./components/Footer";
import "./App.css";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnXcyzYtnIaJ1IqkT7NRPUtunKaUoG7Gc",
  authDomain: "blur-92209.firebaseapp.com",
  databaseURL:
    "https://blur-92209-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blur-92209",
  storageBucket: "blur-92209.firebasestorage.app",
  messagingSenderId: "911830966351",
  appId: "1:911830966351:web:b22dd5a37b239f08990a3a",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const dbRef = ref(db, "posts/");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const postsData = snapshot.val();
        const postsArray = Object.keys(postsData).map((key) => ({
          id: key,
          ...postsData[key],
        }));
        setPosts(postsArray.reverse());
      } else {
        console.log("No data available");
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (name, content) => {
    const postID = new Date()
      .toLocaleTimeString("en-US", { hour12: false })
      .replace(/:/g, "-");
    const datetime = new Date().toISOString();
    const newPost = {
      name,
      content,
      likes: 0,
      datetime,
    };

    await set(ref(db, `posts/${postID}`), newPost);
    setPosts((prevPosts) => [{ id: postID, ...newPost }, ...prevPosts]);
  };

  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <PostForm addPost={addPost} />
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.name}
              content={post.content}
              likes={post.likes}
              datetime={post.datetime}
            />
          ))
        ) : (
          <p className="mt-5">No name found</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
