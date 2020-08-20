import * as React from 'react';
import '../../public/styles/scss/Post.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

type PostProps = {
    match: {
        params: {
            postNo: string;
        };
    };
};

export const Post = (props: PostProps) => {
    React.useEffect(() => {
        fetchPost(props.match.params.postNo);
    });
    const history = useHistory();

    const fetchPost = async (postNo: string) => {
        try {
            // TODO: 포스트 없을 때 처리
            const url = `/api/v1/posts/${postNo ? postNo : 'recent'}`;
            const response = await axios.get(url);
            document.getElementsByClassName('p_title')[0].innerHTML = response.data.title;
            document.getElementsByClassName('p_article')[0].innerHTML = response.data.content;
        } catch (error) {
            console.log(error);
            history.push('/');
        }
    };

    return (
        <div className="post">
            <div className="p_title_container">
                <div className="p_title">
                    <a>This is Post_Title</a>
                </div>
            </div>
            <div className="p_article_container">
                <div className="p_article">
                    <span>This is span in Article</span>
                    <br />
                    <code>This is code in Article</code>
                </div>
            </div>
        </div>
    );
};
