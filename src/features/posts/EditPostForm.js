import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated, selectPostById } from "./postSlice";

export const EditPostForm = ({ match }) => {

    const { postId } = match.params;

    const post = useSelector(state => selectPostById(state, postId));


    const [name, setName] = useState(post.name);
    const [content, setContent] = useState(post.name);


    const dispatch = useDispatch();
    const history = useHistory();


    const onNameChanged = e => setName(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (name && content) {
            dispatch(
                postUpdated({ id: postId, name, content })
            );
            history.push(`/posts/${postId}`);
        }
    };


    return (

        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={name}
                    onChange={onNameChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section >
    )




};