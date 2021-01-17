import * as React from 'react';
import axios from 'axios';
import { Post } from './Post';
import { Message } from './Message';

type OnePostProps = {
    match: {
        params: {
            postNo: string;
        };
    };
};

type PostType = {
    post_no: string;
    title: string;
    content: string;
    tags: Array<string>;
    createDate: string;
    updateDate: string | null;
} | null;

export const OnePost = (props: OnePostProps) => {
    const usePost = (postNo: string, deps: React.DependencyList) => {
        const [post, setPost] = React.useState<PostType>(null);
        const [isError, setIsError] = React.useState(false);
        const [isNoContent, setIsNoContent] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(false);

        const fetchPost = async (postNo: string) => {
            const url = `/api/v1/posts/${postNo}`;
            const response = await axios.get(url);
            if (response.status === 204) setIsNoContent(true);
            setPost({
                post_no: response.data.post_no,
                title: response.data.title,
                content: response.data.content,
                tags: response.data.tags,
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
    const { post, isError, isNoContent, isLoading } = usePost(props.match.params.postNo, []);

    if (isLoading) {
        return (
            <Message message="데이터를 로드하는 중입니다."/>
        );
    }

    if (isError || !post) {
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
        <Post post={post} />
    );
};