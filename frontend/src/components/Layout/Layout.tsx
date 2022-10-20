import React, {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Header} from "../Header";
import {Footer} from "../Footer";

const Layout: FC = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export { Layout };
