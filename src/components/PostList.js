import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import UserHeader from './UserHeader';

const PostList = ({ fetchPosts, posts }) => { 

  useEffect(() => {
    fetchPosts();
  }, [])

  const renderList = posts.map(post => {
    return (
      <div className="item" key={post.id}>
        <i className="large middle aligned icon user" />
        <div className="content">
          <div className="description">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        </div>
        <UserHeader userId={post.userId} />
      </div>
    )
  })

  return (
    <div className="ui relaxed divided list">{renderList}</div>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostList);