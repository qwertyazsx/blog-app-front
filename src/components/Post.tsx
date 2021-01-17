import * as React from 'react';
import '../../public/styles/scss/Post.scss';
import showdown from 'showdown';
import parse from 'html-react-parser';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import markdown from 'highlight.js/lib/languages/markdown';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

type PostProps = {
    post: PostType;
};

type PostType = {
    post_no: string;
    title: string;
    content: string;
    tags: Array<string>;
    createDate: string;
    updateDate: string | null;
};

export const Post = (props: PostProps) => {
    const mdConverter = new showdown.Converter();
    
    React.useEffect(() => {
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('typescript', typescript);
        hljs.registerLanguage('python', python);
        hljs.registerLanguage('markdown', markdown);
        hljs.registerLanguage('java', java);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('html', html);
        hljs.registerLanguage('bash', bash);

        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block as HTMLElement);
        });
    });

    return (
        <div className="post">
            <div className="p_title_container">
                <div className="p_title">{props.post.title}</div>
                <div className="p_info">
                    <div className="p_title_time">{props.post.createDate}</div>
                    <a className="p_edit" href={`/edit/${props.post.post_no}`}>수정</a>
                </div>
                <div className="p_tag_container">
                        {props.post.tags.map((tag) => (
                            // TODO: 태그 클릭시 검색
                            <div className="p_tag" key={tag}>#{tag}</div>
                        ))}
                </div>
            </div>
            <div className="p_article_container">
                <div className="p_article">{parse(mdConverter.makeHtml(props.post.content))}</div>
            </div>
            {/* TODO: 전후 포스트 추가 */}
        </div>
    );
};
