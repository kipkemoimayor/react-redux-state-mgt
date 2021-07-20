import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { fetchPosts, selectAllPosts } from './postSlice';





export const PostList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);

    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;
    if (postStatus === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.name}</h3>
                <p className="post-content">{post.content.substring(0, 100)}</p>
                <p className="text-muted small">Authored by </p>
                <PostAuthor user={post.user}></PostAuthor>
                <Link to={`/posts/${post.id}`} className='button muted-button'>View Post</Link>
            </article>
        ))

    } else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}