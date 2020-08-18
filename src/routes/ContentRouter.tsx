import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Post } from '../components/Post';
import { PostList } from '../components/PostList';

export const ContentRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Post} />
                <Route exact path="/post/:postNo" component={Post} />
                <Route exact path="/postlist" component={PostList} />
                <Redirect path="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
};
