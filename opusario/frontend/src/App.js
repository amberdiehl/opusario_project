import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import OpusarioReducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import PageWrapperComponent from './components/wrappers/PageWrapperComponent';
import CompanyInstanceContainer from './containers/instances/CompanyInstanceContainer';
import ProjectInstanceContainer from './containers/instances/ProjectInstanceContainer';
import RoleInstanceContainer from './containers/instances/RoleInstanceContainer';
import SkillInstanceContainer from './containers/instances/SkillInstanceContainer';
import ToolInstanceContainer from './containers/instances/ToolInstanceContainer';
import Myself from './components/Myself';
import NotFound from './components/NotFound';

// Until symbolic links work, have removed plugin that prevents files from being imported from outside of /src.
// See also, webpack.config.dev.js --> new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
// See also, https://github.com/facebook/create-react-app/issues/3547
import '../../static/css/main.css';
import '../../static/css/font-awesome.min.css';
import '../../static/images/banner.jpg';


let store = createStore(OpusarioReducers, composeWithDevTools(applyMiddleware(thunk)));


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/app/company"} render={()=>
                            <PageWrapperComponent>
                                <CompanyInstanceContainer/>
                            </PageWrapperComponent>
                        } />
                        <Route exact path={"/app/role"} render={()=>
                            <PageWrapperComponent>
                                <RoleInstanceContainer/>
                            </PageWrapperComponent>
                        } />
                        <Route exact path={"/app/skill"} render={()=>
                            <PageWrapperComponent>
                                <SkillInstanceContainer/>
                            </PageWrapperComponent>
                        } />
                        <Route exact path={"/app/tool"} render={()=>
                            <PageWrapperComponent>
                                <ToolInstanceContainer/>
                            </PageWrapperComponent>
                        } />
                         <Route exact path={"/app/project"} render={()=>
                            <PageWrapperComponent>
                                <ProjectInstanceContainer/>
                            </PageWrapperComponent>
                        } />
                        <Route path="/myself" component={Myself} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
export default App;
