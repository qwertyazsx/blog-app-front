import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RecentPosts } from '../components/RecentPosts';
import { PostList } from '../components/PostList';
import { Edit } from '../components/Edit';
import { OnePost } from '../components/OnePost';

export const ContentRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={RecentPosts} />
                <Route exact path="/post/:postNo" component={OnePost} />
                <Route exact path="/postlist/:page" component={PostList} />
                <Route exact path="/edit" component={Edit} />
                <Route exact path="/edit/:postNo" component={Edit} />
                <Redirect path="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
};
