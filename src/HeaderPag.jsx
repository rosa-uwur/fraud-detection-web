import React from 'react';
import { AiOutlineMail, AiOutlineUser, AiOutlineQuestionCircle, AiOutlinePoweroff } from 'react-icons/ai';
import {BiAnalyse} from 'react-icons/bi';
import {SiGoogleanalytics} from 'react-icons/si';
import './HeaderPag.css';

export const Header = () => {
    return (<>
        <div className='Header'>
            <div>
                <span><strong>Compra: </strong><span style={{ color: 'yellow' }}>Q.7.60</span></span>
                <span style={{ marginLeft: '10px' }}><strong>Venta: </strong><span style={{ color: 'yellow' }}>Q.7.94</span></span>
            </div>
            <div>
                <span><strong>Usuario: </strong><span style={{ color: 'yellow' }}>Notrosamn</span></span>
                <span style={{ marginLeft: '10px' }}><strong>Código: </strong><span style={{ color: 'yellow' }}>123456</span></span>
            </div>
            <div>
                <AiOutlineMail style={{ marginRight: '10px' }} />
                <AiOutlineUser style={{ marginRight: '10px' }} />
                <AiOutlineQuestionCircle style={{ marginRight: '10px' }} />
                <AiOutlinePoweroff />
            </div>
        </div>
        <BlueBlock />
        <div className='lineBlueSky'></div>
        </>
    );
}



const BlueBlock = () => {
  return (
    <div className='logoPart'>
        <img src='https://www.bienlinea.bi.com.gt/InicioSesion/Contenido/img/logo_BI-blanco.png' alt='logo' className='imagenLogo'/>
    <div className='contentHeaderPrimary'>
      <div>
        <BiAnalyse size={50} color='rgb(252,193,0)'/>
        <SiGoogleanalytics size={50}/>
        <p>Analyze Fraud Detection</p>
      </div>
    </div>

    </div>
  );
}


export default Header;