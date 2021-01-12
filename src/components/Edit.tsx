import * as React from 'react';
import '../../public/styles/scss/Edit.scss';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Edit = () => {
    const editorRef: React.RefObject<Editor> = React.createRef();
    
    const savePostRequest = async () => {
        try {
            const title = (document.getElementById('e_title') as HTMLInputElement).value;
            const content = editorRef.current?.getInstance().getHtml();
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

    return (
        <div className="edit">
            <div className="e_container">
                <div className="e_title_container">
                    <span>제목</span>
                    <input id="e_title"></input>
                </div>
                <div className="e_content_container">
                    <Editor height="600px" initialEditType="markdown" ref={editorRef}/>
                </div>
                <div className="e_btn_container">
                    <Link to="/">
                        <button className="e_cancel">취소</button>
                    </Link>
                    <Link to="/">
                        <button className="e_submit" onClick={savePostRequest}>저장</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
