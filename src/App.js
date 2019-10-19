import React from 'react';
import PatientsList from './components/PatientsList/PatientsList';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { headerRoutes } from './constants';
import './App.css';

export const App = () => (
    <div className="App">
        <Header/>
        <main className={'Main'}>
            <Switch>
                <Route exact path='/' component={PatientsList}/>
                {headerRoutes.map(route =>
                    <Route path={route.path} component={route.component} key={route.path}/>)}
            </Switch>
        </main>
    </div>

);
