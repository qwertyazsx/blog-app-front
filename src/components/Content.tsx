import * as React from 'react';
import { ContentRouter } from '../routes/ContentRouter';
import '../../public/styles/scss/Content.scss';

// 내용
export const Content = () => {
    return (
        <div className="content">
            <ContentRouter />
        </div>
    );
};
