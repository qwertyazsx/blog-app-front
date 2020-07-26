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
        </div>
    );
};
