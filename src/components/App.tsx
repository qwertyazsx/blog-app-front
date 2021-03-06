import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Content } from './Content';
import { Footer } from './Footer';
import { HeaderContainer } from '../redux/containers/HeaderContainer';
import { SidebarContainer } from '../redux/containers/SidebarContainer';
import { scrollAboveHeader, scrollUnderHeader } from '../redux/actions/App';
import '../../public/styles/scss/App.scss';

export const App = () => {
    const dispatch = useDispatch();
    const onScroll = () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > header.clientTop + header.clientHeight) {
                dispatch(scrollUnderHeader());
            } else {
                dispatch(scrollAboveHeader());
            }
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    });

    return (
        <div className="app">
            <HeaderContainer />
            <SidebarContainer />
            <Content />
            <Footer />
        </div>
    );
};
