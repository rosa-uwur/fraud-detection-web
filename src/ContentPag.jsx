import React from "react";
import GraficasPag from "./GraficasPag"
import Detail from "./Detail";
import Cards from "./Cards";
import './ContentPag.css';

const ContentPag = () => {
    return (
        <div>
            <div className="ContainerGeneral">
                <GraficasPag />
                <Cards />
            </div>
            <Detail />
        </div>

    );

}

export default ContentPag;