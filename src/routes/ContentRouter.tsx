import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Post } from '../components/Post';
import { PostList } from '../components/PostList';
import { Edit } from '../components/Edit';

export const ContentRouter = () => {
    const history = useHistory();

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Post} />
                <Route exact path="/post/:postNo" component={Post} />
                <Route exact path="/postlist" component={PostList} />
                <Route exact path="/edit" component={Edit} />
                <Route exact path="/edit/:postNo" component={Edit} />
                <Redirect path="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
};
