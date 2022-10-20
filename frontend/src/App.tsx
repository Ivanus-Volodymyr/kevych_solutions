import React from 'react';
import {Route, Routes} from "react-router-dom";

import {Layout, Trains} from "./components";
import {UpdateTrain} from "./components/Update_train/Update_train";
import {CreateTrain} from "./components/Create_Train/Create_Train";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={"/"} element={<Trains/>}/>
                <Route path={"/:id"} element={<UpdateTrain/>}/>
                <Route path={"/create"} element={<CreateTrain/>}/>
            </Route>
        </Routes>

    );
}

export default App;
