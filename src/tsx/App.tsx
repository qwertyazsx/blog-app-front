import * as React from 'react';

export interface AppProps {}

export const App: React.FC<AppProps> = props => {
    return <div className="App">hello world!</div>;
}