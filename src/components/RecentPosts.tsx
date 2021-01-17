import * as React from 'react';
import axios from 'axios';
import { Post } from './Post';
import { Message } from './Message';

type PostType = {
    post_no: string;
    title: string;
    content: string;
    tags: Array<string>;
    createDate: string;
    updateDate: string | null;
}

export const RecentPosts = () => {
    const [recentPosts, setRecentPosts] = React.useState<Array<PostType>>([]);
    const [page, setPage] = React.useState<number>();
    const [isError, setIsError] = React.useState(false);
    const [isNoContent, setIsNoContent] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const fetchPost = async (currentPage: number) => {
        const url = `/api/v1/posts/recent/${currentPage + 1}`;
        const response = await axios.get(url);
        if (response.data.totalPages < currentPage) setIsError(true);
        else if (response.data.numberOfElements === 0) setIsNoContent(true);
        else {
            setRecentPosts(recentPosts?.concat(response.data.content.map((post: PostType) => {
                return {
                    post_no: post.post_no,
                    title: post.title,
                    content: post.content,
                    tags: post.tags,
                    createDate: post.createDate,
                    updateDate: post.updateDate,
                }
            })));
            setPage(currentPage + 1);
        }
    };

    const process = async (page: number) => {
        setIsError(false);
        setIsLoading(true);
        try {
            await fetchPost(page);
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        process(0);
    }, []);

    if (isLoading) {
        return (
            <Message message="데이터를 로드하는 중입니다."/>
        );
    }

    if (isError) {
        return (
            <Message message="데이터 로드에 실패했습니다."/>
        );
    }

    if (isNoContent) {
        return (
            <Message message="포스트가 없습니다."/>
        );
    }
    
    return (
        <div className="recentposts">
            {recentPosts.map((post) => (
                <Post key={post.post_no} post={post} />
            ))}
        </div>
    );
};
