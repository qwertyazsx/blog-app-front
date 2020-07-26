import * as React from 'react';
import '../../public/styles/scss/Post.scss';

// 내용
export const Post = () => {
    return (
        <div className="post">
            <div className="article_title">This is Article_Title</div>
            <article>This is Article</article>
        </div>
    );
};
