import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Photos from './Photos'

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Photos</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Photos />
        </Route>
      </Switch>
    </div>
  </Router>
)

export default App
