import React, { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import "../styles/Post.css";
import likeIcon from "../assets/like_icon.svg";
import likeIconFill from "../assets/like_fill.svg";

function Post({ id, name, content, likes, datetime }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    const db = getDatabase();
    const postRef = ref(db, `posts/${id}`);

    if (liked) {
      setLikeCount(likeCount - 1);
      await update(postRef, { likes: likeCount - 1 });
    } else {
      setLikeCount(likeCount + 1);
      await update(postRef, { likes: likeCount + 1 });
    }
    setLiked(!liked);
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="post">
      <h2 className="post-name">
        {name} <span className="post-datetime">│ {formatDate(datetime)}</span>
      </h2>
      <p className="post-content">{content}</p>
      <div className="post-likes-container">
        <img
          src={liked ? likeIconFill : likeIcon}
          alt="like icon"
          className="like-icon"
          onClick={handleLike}
        />
        <span className="post-likes">{likeCount} people liked this</span>
      </div>
    </div>
  );
}

export default Post;
