import * as React from 'react';
import '../../public/styles/scss/Post.scss';
import axios from 'axios';
import parse from 'html-react-parser';

type PostProps = {
    match: {
        params: {
            postNo: string;
        };
    };
};

type PostType = {
    title: string;
    content: string;
    createDate: string;
    updateDate: string | null;
} | null;

const usePost = (postNo: string, deps: React.DependencyList) => {
    const [post, setPost] = React.useState<PostType>(null);
    const [isError, setIsError] = React.useState(false);
    const [isNoContent, setIsNoContent] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const fetchPost = async (postNo: string) => {
        const url = `/api/v1/posts/${postNo ? postNo : 'recent'}`;
        const response = await axios.get(url);
        if (response.status === 204) setIsNoContent(true);
        setPost({
            title: response.data.title,
            content: response.data.content,
            createDate: response.data.createDate,
            updateDate: response.data.updateDate,
        });
    };

    const process = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            await fetchPost(postNo);
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        process();
    }, deps);

    return { post, isError, isNoContent, isLoading };
};

export const Post = (props: PostProps) => {
    const { post, isError, isNoContent, isLoading } = usePost(props.match.params.postNo, []);

    if (isLoading) {
        return (
            <div className="post flex">
                <div className="message_container">
                    <span>데이터를 로드하는 중입니다.</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="post flex">
                <div className="message_container">
                    <span>데이터 로드에 실패했습니다.</span>
                </div>
            </div>
        );
    }

    if (isNoContent) {
        return (
            <div className="post flex">
                <div className="message_container">
                    <span>포스트가 없습니다.</span>
                </div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="post">
            <div className="p_title_container">
                <div className="p_title">{post.title}</div>
                <div className="p_title_time">{post.createDate}</div>
            </div>
            <div className="p_article_container">
                <div className="p_article">{parse(post.content)}</div>
            </div>
        </div>
    );
};
