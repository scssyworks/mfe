import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Header from './components/Header';
import Progress from './components/Progress';
import { useState } from 'react';

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));


const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthApp onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </StylesProvider>
    );
}