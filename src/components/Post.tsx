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
    postNo: string;
    title: string;
    content: string;
    tags: Array<string>;
    createDate: string;
    updateDate: string | null;
} | null;

export const Post = (props: PostProps) => {
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
                postNo: response.data.post_no,
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
                <div className="p_info">
                    <div className="p_title_time">{post.createDate}</div>
                    <a className="p_edit" href={`/edit/${post.postNo}`}>수정</a>
                </div>
                <div className="p_tag_container">
                        {post.tags.map((tag) => (
                            // TODO: 태그 클릭시 검색
                            <div className="p_tag" key={tag}>#{tag}</div>
                        ))}
                </div>
            </div>
            <div className="p_article_container">
                {/* TODO: 마크다운 html로 변환 */}
                <div className="p_article">{parse(post.content)}</div>
            </div>
            {/* TODO: 전후 포스트 추가 */}
        </div>
    );
};
