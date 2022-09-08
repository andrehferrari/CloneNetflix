import React from "react";
import './Header.css'
import Logo from '../../assets/logo.png'
import Usuario from '../../assets/usuario.PNG'

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={Logo} alt='Netflix'/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={Usuario} alt='Usuario'/>
                </a>
            </div>
        </header>
    );
}