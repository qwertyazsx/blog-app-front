import * as React from 'react';
import '../../public/styles/scss/Edit.scss';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Link } from 'react-router-dom';
import axios from 'axios';

type EditProps = {
    match: {
        params: {
            postNo: string | null;
        };
    };
};

type PostType = {
    postNo: string;
    title: string;
    content: string;
    createDate: string;
    updateDate: string | null;
} | null;

export const Edit = (props: EditProps) => {
    const editorRef: React.RefObject<Editor> = React.createRef();
    const [titleValue, setTitleValue] = React.useState('');
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
                postNo: response.data.post_no,
                title: response.data.title,
                content: response.data.content,
                createDate: response.data.createDate,
                updateDate: response.data.updateDate,
            });
            setTitleValue(response.data.title);
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

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    }

    const savePostRequest = async () => {
        try {
            const title = (document.getElementById('e_title') as HTMLInputElement).value;
            const content = editorRef.current?.getInstance().getMarkdown();
            // TODO: 태그 추가
            const response = await axios.post('/api/v1/posts/save', {
                title: title,
                content: content,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const updatePostRequest = async () => {
        try {
            if (!props) throw 'postNo not exists.';
            const title = (document.getElementById('e_title') as HTMLInputElement).value;
            const content = editorRef.current?.getInstance().getMarkdown();

            console.log(title, content);

            // TODO: 태그 추가
            const response = await axios.put('/api/v1/posts/update/' + props.match.params.postNo, {
                title: title,
                content: content,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    if (props.match.params.postNo != null) {
        const { post, isError, isNoContent, isLoading } = usePost(props.match.params.postNo, []);

        if (isLoading) {
            return (
                <div className="edit flex">
                    <div className="message_container">
                        <span>데이터를 로드하는 중입니다.</span>
                    </div>
                </div>
            );
        }

        if (isError) {
            return (
                <div className="edit flex">
                    <div className="message_container">
                        <span>데이터 로드에 실패했습니다.</span>
                    </div>
                </div>
            );
        }

        if (isNoContent) {
            return (
                <div className="edit flex">
                    <div className="message_container">
                        <span>포스트가 없습니다.</span>
                    </div>
                </div>
            );
        }

        if (post) {
            return (
                <div className="edit">
                    <div className="e_container">
                        <div className="e_title_container">
                            <span>제목</span>
                            <input id="e_title" value={titleValue} onChange={onChangeHandler}></input>
                        </div>
                        <div className="e_content_container">
                            <Editor height="600px" initialEditType="markdown" initialValue={post.content} ref={editorRef} />
                        </div>
                        <div className="e_btn_container">
                            <Link to={`/post/${post.postNo}`}>
                                <button className="e_cancel">취소</button>
                            </Link>
                            <a href={`/post/${post.postNo}`}>
                                <button className="e_submit" onClick={updatePostRequest}>저장</button>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="edit">
            <div className="e_container">
                <div className="e_title_container">
                    <span>제목</span>
                    <input id="e_title"></input>
                </div>
                <div className="e_content_container">
                    <Editor height="600px" initialEditType="markdown" ref={editorRef} />
                </div>
                <div className="e_btn_container">
                    <Link to="/">
                        <button className="e_cancel">취소</button>
                    </Link>
                    <a href="/">
                        <button className="e_submit" onClick={savePostRequest}>저장</button>
                    </a>
                </div>
            </div>
        </div>
    );
};
