import React, { useState, useEffect } from "react";
import "./GraficasPag.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const getTodayAndYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    return {
        today: today.toISOString().split('T')[0],
        yesterday: yesterday.toISOString().split('T')[0]
    };
}



const GraficasPag = () => {
    const dates = getTodayAndYesterday();
    const [data, setData] = useState([]);
    const [fechas, setFechas] = useState({
        input1: dates.yesterday,
        input2: dates.today
    });


    //Funcion que a base de los datos de fecha1 y fecha 2, busca los datos en la APi
    function buscaFechas() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fechaInicio": `${fechas.input1}`,
            "fechaFin": `${fechas.input2}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(raw)
        fetch("https://apiftr.up.railway.app/sumatoria-transacciones-por-dia", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
    }

    //Carga al iniciar por primera vez
    useEffect(() => {
        buscaFechas();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFechas({
            ...fechas,
            [name]: value,
        });
    };


    //renderiza el contenido luego de las validaciones
    return (
        <div className="ContainerGraf">
            <h1>Transacciones</h1>
            <GraficaBarras data={data} />
            <div className="InputBoxGraf">
                <div className="InputBoxGrafChild">
                    <label className="InputBoxGrafLabel">Fecha Inicio</label>
                    <input className="InputBoxGrafItem" type="date" placeholder="fecha1" name="input1" value={fechas.input1} onChange={handleInputChange} />
                </div>
                <div className="InputBoxGrafChild">
                    <label className="InputBoxGrafLabel">Fecha Fin</label>
                    <input className="InputBoxGrafItem" type="date" placeholder="fecha2" name="input2" value={fechas.input2} onChange={handleInputChange} />
                </div>
            </div>
            <button className="InputBoxGrafButton" onClick={buscaFechas}>Consultar</button>
        </div>
    );
}

const GraficaBarras = ({ data }) => {
    return (
        <>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={
                    {
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }
                }
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalTransacciones" fill="#4CBED2" />
            </BarChart>
            {data.length === 0 ? <h1>No hay datos, ingrese una fecha Valida</h1> : null}
        </>

    )
}

export default GraficasPag;