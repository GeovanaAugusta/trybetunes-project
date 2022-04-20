import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route
            path="/album/:id"
            render={ (propsRouter) => (
              <Album { ...propsRouter } />
            ) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

// SOURCE
// Requisito 1
// https://github.com/tryber/sd-020-a-live-lectures/commit/163dca3300df1dba51ec159e430e889c92893542 e https://vimeo.com/699809071
// Requisito 7
// https://vimeo.com/699809071 32:23 como passar propsRouter
