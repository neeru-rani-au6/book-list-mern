import React, { Component } from 'react';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import { HashRouter, Route } from 'react-router-dom';
import PublicBooks from './components/publicBooks';
import Header from './components/header';
class App extends Component {

    render() {
        return (
            <HashRouter>
                <Header />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/home" component={Home} exact />
                <Route path="/" component={PublicBooks} exact />
            </HashRouter>
        )
    }
}



export default App;