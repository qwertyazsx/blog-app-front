import * as React from 'react';
import '../../public/styles/scss/RecentPosts.scss';
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
    const [page, setPage] = React.useState<number>(0);
    const [isEnd, setIsEnd] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isNoMorePost, setIsNoMorePost] = React.useState(false);

    const fetchPost = async (currentPage: number) => {
        const url = `/api/v1/posts/recent/${currentPage + 1}`;
        const response = await axios.get(url);
        if (response.data.totalPages < currentPage || response.data.numberOfElements === 0) setIsNoMorePost(true);
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

    const processFetch = async (page: number) => {
        if (!isLoading && !isNoMorePost) {
            setIsLoading(true);
            try {
                await fetchPost(page);
            } catch (error) {
                console.log(error);
                setIsError(true);
            }
            setIsLoading(false);
        }
    };

    const onScroll = () => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 10) {
            setIsEnd(true);
        }
    }

    React.useEffect(() => {
        processFetch(0);
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    React.useEffect(() => {
        setIsEnd(false);
        processFetch(page);
    }, [isEnd]);

    if (isError) {
        return (
            <Message message="데이터 로드에 실패했습니다."/>
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
