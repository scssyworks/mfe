import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

export const mount = (el, {
    onNavigate,
    onSignIn,
    defaultHistory,
    initialPath
}) => {
    const history = defaultHistory || createMemoryHistory(initialPath && {
        initialEntries: [initialPath],
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);
    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
};

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-root');
    if (el) {
        mount(el, {
            defaultHistory: createBrowserHistory(),
        });
    }
}