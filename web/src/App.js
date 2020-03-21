import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Tracker from './Tracker'
import Photos from './Photos'

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Track</Link>
          </li>
          <li>
            <Link to="/photos">Photos</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/photos">
          <Photos />
        </Route>

        <Route path="/">
          <Tracker />
        </Route>
      </Switch>
    </div>
  </Router>
)

export default App
