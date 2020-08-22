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
            {/* TODO: 포스트 작성 버튼 추가 */}
        </div>
    );
};
