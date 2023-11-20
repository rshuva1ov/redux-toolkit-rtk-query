import React, { FC } from 'react';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';
import { IPost } from '../store/models/IPost';

const PostContainer2: FC = () => {
    const { data: posts, error, isLoading } = postAPI.useFetchAllUsersQuery(10);
    const [deletePost, { }] = postAPI.useDeletePostMutation();
    const [updatePost, { }] = postAPI.useUpdatePostMutation();

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }
    return (
        <div className='post__list'>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            {posts && posts.map(post =>
                <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
            )}
        </div >
    );
};

export default PostContainer2;