import React from 'react';
import '../../public/styles/scss/Header.scss';

type HeaderProps = {
    openSidebar: () => void;
    isScrollUnderHeader: boolean;
};

export const Header = (props: HeaderProps) => {    
    return (
        <header>
            <div className="flex header normal">
                <button className="h_btn_side" onClick={props.openSidebar}>
                    <img />
                </button>
                    <h1>
                        <a className="title" href="/">Snore</a>
                    </h1>
                <button className="h_btn_search">
                    <img />
                </button>
            </div>
            <div className={`flex header mini${props.isScrollUnderHeader ? ' active' : ''}`}>
                <button className="h_btn_side" onClick={props.openSidebar}>
                    <img />
                </button>
                <h1>
                    <a className="title" href="/">Snore</a>
                </h1>
                <button className="h_btn_search">
                    <img />
                </button>
            </div>
        </header>
    );
};
