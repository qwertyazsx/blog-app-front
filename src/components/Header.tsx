import * as React from 'react';
import '../../public/styles/scss/Header.scss';

export const Header = () => {
    return (
        <header className="flex header">
            <h1>
                <a className="title">Snore</a>
            </h1>
        </header>
    );
};
