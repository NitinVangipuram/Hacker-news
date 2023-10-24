
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './PostDetail.css';

function PostDetail() {
  const { objectID } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://hn.algolia.com/api/v1/items/${objectID}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPost();
  }, [objectID]);

  const renderComments = () => {
   
    if (post && post.children) {
      return post.children.map((comment, index) => (
         <div className='comment'>
        <h3>
     By {comment.author} | {comment.created_at}
    </h3>
        <div key={index}  dangerouslySetInnerHTML={{ __html: comment.text }} />
        
</div>
      ));
    }

    return null;
  };

  return (
    <div>
      {post ? (
        <div>
          <div className='titles'>
            <h2 className='heading'>{post.title}</h2>
            <div className='heading-content'>
              <p> <span className='info'>Points:</span> {post.points}</p>
              <p> <span className='info'>Author:</span> {post.author}</p>
              <p><span className='info'>Created at:</span> {post.created_at}</p>
            </div>
           
          </div>
          
          <div className='main-content'><h2 className='info'>Comments</h2>{renderComments()}</div>
        </div>
      ) : (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}

export default PostDetail;
