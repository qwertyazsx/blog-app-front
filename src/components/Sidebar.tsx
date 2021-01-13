import * as React from 'react';
import '../../public/styles/scss/Sidebar.scss';

type SidebarProps = {
    closeSidebar: () => void;
    sidebarCollapsed: boolean;
};

export const Sidebar = (props: SidebarProps) => {
    return (
        <div className={`sidebar${props.sidebarCollapsed ? '' : ' active'}`}>
            <button className="s_btn_close" onClick={props.closeSidebar}>
                <img />
            </button>
            <div className="s_menu">
                <a href="/edit" className="s_a_edit">
                    📝 포스트 작성
                </a>
            </div>
        </div>
    );
};
