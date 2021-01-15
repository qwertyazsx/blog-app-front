import * as React from 'react';
import '../../public/styles/scss/PostList.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

type PostListProps = {
    match: {
        params: {
            page: number;
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
}

export const PostList = (props: PostListProps) => {
    const usePost = (page: number, deps: React.DependencyList) => {
        const [postList, setPostList] = React.useState<Array<PostType>>([]);
        const [endPage, setEndPage] = React.useState(1);
        const [isError, setIsError] = React.useState(false);
        const [isNoContent, setIsNoContent] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(false);

        const fetchPostList = async (page: number) => {
            const url = `/api/v1/posts/list/${page}`;
            const response = await axios.get(url);
            console.log(response.data);
            if (response.data.totalPages < props.match.params.page) setIsError(true);
            else if (response.data.numberOfElements === 0) setIsNoContent(true);
            else {
                setPostList(response.data.content.map((post: PostType) => {
                    return {
                        post_no: post.post_no,
                        title: post.title,
                        content: post.content,
                        tags: post.tags,
                        createDate: post.createDate,
                        updateDate: post.updateDate,
                    }
                }));
                setEndPage(response.data.totalPages);
            }
        };

        const process = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                await fetchPostList(page);
            } catch (error) {
                console.log(error);
                setIsError(true);
            }
            setIsLoading(false);
        };

        React.useEffect(() => {
            process();
        }, deps);

        return { postList, endPage, isError, isNoContent, isLoading };
    };

    const truncate = (text: string) => {
        const limit = 200;
        if (text.length > limit) return text.substring(0, limit) + '...';
        return text;
    };

    const { postList, endPage, isError, isNoContent, isLoading } = usePost(props.match.params.page, []);

    if (isLoading) {
        return (
            <div className="postlist flex">
                <div className="message_container">
                    <span>데이터를 로드하는 중입니다.</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="postlist flex">
                <div className="message_container">
                    <span>데이터 로드에 실패했습니다.</span>
                </div>
            </div>
        );
    }

    if (isNoContent) {
        return (
            <div className="postlist flex">
                <div className="message_container">
                    <span>포스트가 없습니다.</span>
                </div>
            </div>
        );
    }

    if (!postList) return null;

    return (
        <div className="postlist">
            <div className="pl_container">
                <div className="pl_list">
                    {postList.map((post) => (
                        <Link to={`/post/${post.post_no}`} className="pl_card" key={post.post_no}>
                            <div className="pl_card_header">
                                <div className="pl_card_title">{post.title}</div>
                                <div className="pl_card_tag_container">
                                    {/* TODO: 태그 수 제한 추가 */}
                                    {post.tags.map((tag) => (
                                        <div className="pl_card_tag" key={tag}>#{tag}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="pl_card_content">{truncate(post.content)}</div>
                            <div className="pl_card_updatedate">{post.updateDate}</div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="pl_pages">
                {props.match.params.page > 1 ? (<span>⬅️</span>) : ''}
                <span>{props.match.params.page}</span>
                {props.match.params.page < endPage ? (<span>➡️</span>) : ''}
            </div>
        </div>
    );
};
