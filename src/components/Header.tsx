import React, { useState } from 'react';
import '../../public/styles/scss/Header.scss';

type HeaderProps = {
    openSidebar: () => void;
};

export const Header = (props: HeaderProps) => {
    return (
        <header className="flex header">
            <button className="h_side_button" onClick={props.openSidebar}>
                Button
            </button>
            <h1>
                <a className="title">Snore</a>
            </h1>
        </header>
    );
};
