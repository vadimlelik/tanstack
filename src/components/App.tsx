// @flow 

import {useRoutes} from "react-router-dom";
import routesConfig from "../config/routesConfig.tsx";
import {Suspense} from "react";

const Loading = () => {
    return <h1>Loading</h1>
}

const App = () => {
    const routes = useRoutes(routesConfig)
    return (
        <div>
            <Suspense fallback={<Loading/>}>
                {routes}
            </Suspense>
        </div>
    );
};

export default App