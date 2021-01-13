import * as React from 'react';
import '../../public/styles/scss/Sidebar.scss';
import axios from 'axios';

type SidebarProps = {
    closeSidebar: () => void;
    sidebarCollapsed: boolean;
};

export const Sidebar = (props: SidebarProps) => {
    const [postCount, setPostCount] = React.useState(0);

    const fetchCount = async () => {
        const url = `/api/v1/posts/count`;
        const response = await axios.get(url);
        setPostCount(response.data);
    };

    fetchCount();

    return (
        <div className={`sidebar${props.sidebarCollapsed ? '' : ' active'}`}>
            <button className="s_btn_close" onClick={props.closeSidebar}>
                <img />
            </button>
            <div className="s_menu">
                <a href="/edit" className="s_a_edit">
                    📝 포스트 작성
                </a>
                <a href="/postlist/1" className="s_a_postlist">
                    전체 포스트<div className="s_count">{postCount}</div>
                </a>    
            </div>
        </div>
    );
};
