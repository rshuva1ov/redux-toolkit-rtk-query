import { FC, useState } from 'react';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';
import { IPost } from '../store/models/IPost';

const PostContainer: FC = () => {
    const [limit, setLimit] = useState(100)
    const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllUsersQuery(limit, {
        pollingInterval: 1000,
    });
    const [createPost, { error: createError, isLoading: isCreateLoading }] = postAPI.useCreatePostMutation();
    const [deletePost, { error: deleteError, isLoading: isDeleteLoading }] = postAPI.useDeletePostMutation();
    const [updatePost, { error: updateError, isLoading: isUpdateLoading }] = postAPI.useUpdatePostMutation();

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLimit(3);
    //     }, 2000)
    // }, [])
    const handleCreate = async () => {
        const title = prompt();
        await createPost({ title, body: title } as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }


    return (
        <div className='post__list'>
            <button onClick={handleCreate}>Add new post</button>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            <button onClick={() => refetch()}>REFRESH DATA</button>
            {posts && posts.map(post =>
                <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
            )}
        </div >
    );
};

export default PostContainer;