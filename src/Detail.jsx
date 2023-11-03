import React, { useState, useEffect } from 'react';
import './Detail.css';

function Detail() {
    const [originalData, setOriginalData] = useState(null); // Mantenemos una copia de los datos originales
    const [data, setData] = useState(null);
    const [selectedAttribute, setSelectedAttribute] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://apiftr.up.railway.app/todas-las-transacciones');
                const jsonData = await response.json();
                jsonData.forEach(item => {
                    item.fecha = item.fecha.slice(0, 10);
                });
                setData(jsonData);
                setOriginalData(jsonData); // Guardamos una copia de los datos originales
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilter = () => {
        if (selectedAttribute && filterValue) {
            const filteredData = originalData.filter(item => item[selectedAttribute] == filterValue); // Aplicamos el filtro sobre los datos originales
            setData(filteredData);
        }
    };

    const resetFilter = () => {
        setData(originalData); // Reseteamos los datos a la copia original
        setSelectedAttribute('');
        setFilterValue('');
    };

    return (
        <div className='contentTable'>
            <div className="select-container">
                <select
                    value={selectedAttribute}
                    onChange={(e) => setSelectedAttribute(e.target.value)}
                >
                    <option value="">Selecciona un atributo</option>
                    <option value="fecha">Fecha</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="moneda">Moneda</option>
                    <option value="mcc">MCC</option>
                    <option value="monto">Monto</option>
                </select>
                <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                <button className="filter-button" onClick={handleFilter}>Filtrar</button>
                <button className="filter-button" onClick={resetFilter}>Resetear Filtro</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Tarjeta</th>
                        <th>Moneda</th>
                        <th>MCC</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? (
                        data.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.fecha}</td>
                                <td>{item.tarjeta}</td>
                                <td>{item.moneda}</td>
                                <td>{item.mcc}</td>
                                <td>{item.monto}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Cargando datos...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Detail;