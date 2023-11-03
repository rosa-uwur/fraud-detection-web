import React, { useState, useEffect } from 'react';
import { GiRobber } from 'react-icons/gi'
import { LiaMoneyBillSolid } from 'react-icons/lia'

import './Cards.css';


function Cards() {

    const hoy = new Date();

    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por lo que necesitas sumar 1
    const yyyy = hoy.getFullYear();

    const fechaHoy = yyyy + '-' + mm + '-' + dd;

    const [data, setData] = useState([]);

    const [dataMoneda, setDatamoneda] = useState([]);


    function buscaFechas() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fechaInicio": fechaHoy,
            "fechaFin": fechaHoy
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://apiftr.up.railway.app/sumatoria-transacciones-por-dia", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
    }


    function buscaMonedas() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fecha": fechaHoy
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://apiftr.up.railway.app/sumatoria-transacciones-por-moneda", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Función de comparación para ordenar por "moneda"
                const compararMonedas = (a, b) => {
                    if (a.moneda < b.moneda) return -1;
                    if (a.moneda > b.moneda) return 1;
                    return 0;
                }

                // Ordenar los datos por "moneda"
                result.sort(compararMonedas);

                setDatamoneda(result);
            })
            .catch(error => console.log('error', error));

    }

    buscaFechas();
    buscaMonedas();

    const ElementoTransaccion = ({ totalTransacciones, totalMonto, moneda }) => {
        return (
            <div>
                <p>Moneda: {moneda}</p>
                <p>Total Monto: {totalMonto}</p>
                <p>Total Transacciones: {totalTransacciones}</p>
            </div>
        );
    };

    return (
        <>
            <div>
                <div className='main-cards'>
                    {data.length > 0 ? (
                        <div className='card'>
                            {console.log(data)}
                            <div className='card-inner'>
                                <h3>FRAUDES DETECTADOS EL DÍA: {data[0].fecha}</h3>
                                <GiRobber className='card_icon' size={90} />
                            </div>
                            <h1>{data[0].totalTransacciones}</h1>
                        </div>
                    ) : (
                        <div className='card-inner'>
                            <h3>Cargando datos...</h3>
                            <GiRobber className='card_icon' size={90} />
                        </div>
                    )}

                    {dataMoneda.length > 0 ? (
                        dataMoneda.map((item) => (
                            <div className='card'>
                                <div className='card-inner'>
                                    <h2>TOTAL {item.moneda}</h2>
                                    <LiaMoneyBillSolid className='card_icon' size={90} />
                                </div>
                                <h1>{item.totalMonto}</h1>
                            </div>
                        ))
                    ) : (
                        <div className='card-inner'>
                            <h3>Cargando datos...</h3>
                            <GiRobber className='card_icon' size={90} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Cards