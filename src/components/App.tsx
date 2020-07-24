import * as React from 'react';
import { Content } from './Content';
import { Footer } from './Footer';
import { HeaderContainer } from '../redux/containers/HeaderContainer';
import { SidebarContainer } from '../redux/containers/SidebarContainer';
import '../../public/styles/scss/App.scss';

export const App = () => {
    return (
        <div className="app">
            <HeaderContainer />
            <SidebarContainer />
            <Content />
            <Footer />
        </div>
    );
};
