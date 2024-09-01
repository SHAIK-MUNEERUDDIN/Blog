import React, { useEffect, useState } from "react";
import { PostForm, Container } from "../components/Index";
import service from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState([]);
  const { url } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (url) {
      service.getPost(url).then((post) => {
        setPosts(post);
      });
    } else {
      navigate("/");
    }
  }, [url, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
