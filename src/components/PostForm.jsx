import React, { useState } from "react";
import "../styles/PostForm.css";

function PostForm({ addPost }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(name, content);
    setName("");
    setContent("");
  };

  return (
    <form id="postForm" onSubmit={handleSubmit}>
      <input
        id="nameInput"
        type="text"
        name="name"
        placeholder="What's your name?"
        value={name}
        onChange={handleChange}
      />
      <textarea
        id="textArea"
        name="content"
        placeholder="What's on your mind?"
        value={content}
        onChange={handleChange}
      />
      <button id="postButton" type="submit" disabled={!name || !content}>
        Post
      </button>
    </form>
  );
}

export default PostForm;
