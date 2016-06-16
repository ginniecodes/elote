import React from 'react';
import { render } from 'react-dom';

//Import components
import App from './App';
import Single from './Single';
import StoryGrid from './StoryGrid';

//Import react-router dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={StoryGrid}></IndexRoute>
        <Route path="/user/story/:postId" component={Single}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('react-app'));