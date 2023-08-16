
import { useRoutes, Route, Routes } from "react-router-dom";

import UnauthenticatedRoutes from "./UnauthenticatedRoutes";


const Router = () => {
    return useRoutes([UnauthenticatedRoutes]);
};

export default Router;