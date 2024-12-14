import React from "react";
import {Link} from "react-router-dom";
import homeImage from '../assets/img/house-fill-3.svg'
import dexImage from '../assets/img/journals-3.svg'
import formImage from '../assets/img/keyboard-3.svg'

export function Navbar() {
    return (
        <div className="nav-vertical">
            <Link to="/">
                <article className="alert">
                    <img className="house-fill" src={homeImage} alt="Home" />
                    <div className="place bodysmall">Home</div>
                </article>
            </Link>
            <Link to="/details">
                <article className="alert">
                    <img className="journals" src={dexImage} alt="Dex" />
                    <div className="dex bodysmall">Dex</div>
                </article>
            </Link>
            <Link to="/form">
                <article className="alert">
                    <img className="keyboard" src={formImage} alt="Form" />
                    <div className="form bodysmall">Form</div>
                </article>
            </Link>
        </div>
    );
}


