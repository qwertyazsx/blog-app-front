import * as React from 'react';
import '../styles/scss/Header.scss';

export const Header = () => {
    return (
        <header className="flex header">
            <h1>
                <a className="title">Snore</a>
            </h1>
        </header>
    );
};
