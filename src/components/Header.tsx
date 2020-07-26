import React, { useState } from 'react';
import '../../public/styles/scss/Header.scss';

type HeaderProps = {
    openSidebar: () => void;
};

export const Header = (props: HeaderProps) => {
    return (
        <header className="flex header">
            <button className="h_btn_side" onClick={props.openSidebar}>
                <img />
            </button>
            <h1>
                <a className="title">Snore</a>
            </h1>
            <button className="h_btn_search">
                <img />
            </button>
        </header>
    );
};
