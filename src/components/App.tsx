import * as React from 'react';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import '../styles/scss/App.scss';

export const App = () => {
    return (
        <div className="app">
            <Header />
            <Sidebar />
            <Content />
            <Footer />
        </div>
    );
};
