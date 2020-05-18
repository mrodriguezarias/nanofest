import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Game, Admin, Reset } from "./pages"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import io from "socket.io-client"
import createSocketIoMiddleware from "redux-socket.io"

import { WEBSOCKET_URL } from "./core/constants"
import combineReducers from "./core/reducers"

const socket = io(WEBSOCKET_URL)

const socketIoMiddleware = createSocketIoMiddleware(socket, "SV_")

const createStoreWithMiddlewares = applyMiddleware(socketIoMiddleware)(
  createStore,
)
const store = createStoreWithMiddlewares(combineReducers)

store.subscribe(() => {
  console.log("new client state", store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Game} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/reset" component={Reset} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)
