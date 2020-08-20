import * as React from 'react';
import '../../public/styles/scss/Edit.scss';

export const Edit = () => {
    return (
        <div className="edit">
            <div className="editor">
                <div className="e_title_container">
                    <span>제목</span>
                    <input className="title"></input>
                </div>
                <div className="e_content_container"></div>
                <div className="e_btn_container">
                    <button className="e_cancel">취소</button>
                    <button className="e_submit">저장</button>
                </div>
            </div>
        </div>
    );
};
