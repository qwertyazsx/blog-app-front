import * as React from 'react';
import '../../public/styles/scss/Post.scss';

// 내용
export const Post = () => {
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
