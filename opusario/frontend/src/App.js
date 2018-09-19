import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore } from "redux";
import OpusarioApp from "./reducers";

import Myself from './components/Myself';
import NotFound from './components/NotFound';

// Until symbolic links work, have removed plugin that prevents files from being imported from outside of /src.
// See also, webpack.config.dev.js --> new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
// See also, https://github.com/facebook/create-react-app/issues/3547
import '../../static/css/main.css';
import '../../static/images/banner.jpg';


let store = createStore(OpusarioApp);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/myself" component={Myself}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
export default App;
