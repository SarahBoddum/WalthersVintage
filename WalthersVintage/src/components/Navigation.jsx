import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/Images/wvlogo.png';
import kurv from '../assets/Images/kurv.svg';
import login from '../assets/Images/login.svg';
import { useKurv } from '../components/KurvContext';

export default function Navigation() {
    const [burgerActive, setBurgerActive] = useState(false);
    const [krydsActive, setKrydsActive] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // Dropdown state
    const { kurvData } = useKurv(); // Hent produkter i kurven
    const antallet = kurvData.length;

    const toggleBurger = () => {
        setBurgerActive(!burgerActive);
        setKrydsActive(!krydsActive);
    };

    const closeAll = () => {
        setBurgerActive(false);
        setKrydsActive(false);
        setActiveDropdown(null); // Luk dropdowns
    };

    const handleDropdownClick = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null); // Luk hvis samme dropdown klikkes igen
        } else {
            setActiveDropdown(dropdown); // Åbn valgt dropdown
        }
    };

    // Effekt: Lås scrolling, når burger-menuen er aktiv
    useEffect(() => {
        if (burgerActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Ryd op ved unmount
        return () => {
            document.body.style.overflow = "";
        };
    }, [burgerActive]);

    return (
        <nav className="navigation" id="navbar">
            <div id="mobilheader">
                <div id="mobilIkoner">
                    <NavLink className="mobil" to="/login" onClick={closeAll}>
                        <img id="loginikon" src={login} alt="Logo" />
                    </NavLink>
                    <NavLink className="navlink mobil" id="Mkurv" to="/kurv" onClick={closeAll}>
                        <img id="Mkurvikon" src={kurv} alt="Kurv" loading="lazy" />
                        <div>
                            <p id="MTæller">{antallet}</p>
                        </div>
                    </NavLink>
                </div>
                <div
                    className={krydsActive ? "close" : null}
                    onClick={toggleBurger}
                    id="burger-menu"
                >
                    <span></span>
                </div>
            </div>

            <div id="menu" className={burgerActive ? "overlay" : null}>
                <div id="xul">
                    <div className="dropdown">
                        <div
                            className="navlink"
                            id="om"
                            onClick={() => handleDropdownClick("om")}
                        >
                            <div className="mobil Mcirkel"></div>Om
                        </div>

                        {activeDropdown === "om" && (
                            <div className="dropdown-content">
                                <NavLink className="navlink" to="/om" onClick={closeAll}>
                                    <div className="mobil Mcirkel"></div>Om Walthers Vintage
                                </NavLink>
                                <NavLink className="navlink" to="/faq" onClick={closeAll}>
                                    <div className="mobil Mcirkel"></div>FAQ
                                </NavLink>
                                <NavLink className="navlink" to="/betingelser" onClick={closeAll}>
                                    <div className="mobil Mcirkel"></div>Betingelser
                                </NavLink>
                                <NavLink className="navlink" to="/kontakt" onClick={closeAll}>
                                    <div className="mobil Mcirkel"></div>Kontakt
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <div className="dropdown">
                        <div
                            className="navlink"
                            id="produkt"
                            onClick={() => handleDropdownClick("produkt")}
                        >
                            <div className="mobil Mcirkel"></div>Produkter
                        </div>

                        {activeDropdown === "produkt" && (
                            <div className="dropdown-content" id="produktDD">
                                <NavLink
                                    className="navlink"
                                    to="/stitchstories"
                                    onClick={closeAll}
                                >
                                    <div className="mobil Mcirkel"></div>Stitch_Stories
                                </NavLink>
                                <NavLink className="navlink" to="/vintage" onClick={closeAll}>
                                    <div className="mobil Mcirkel"></div>Vintage
                                </NavLink>
                                <NavLink className="navlink" to="/upcycled" onClick={closeAll}>
                                    <div className="mobil Mcirkel"></div>Upcycled
                                </NavLink>
                                <NavLink className="navlink" to="/strguide" onClick={closeAll}>
                                    <div className="mobil Mcirkel"></div>Størrelsesguide
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink
                        className="navlink HJÆLP"
                        to="/baredygtig"
                        onClick={closeAll}
                    >
                        <div className="mobil Mcirkel"></div>Mit Håndværk
                    </NavLink>
                    <NavLink
                        className="navlink laptop"
                        id="logolink"
                        to="/forsidepage"
                        onClick={closeAll}
                    >
                        <img id="logo" src={logo} alt="Logo" loading="lazy" />
                    </NavLink>
                    <NavLink className="navlink laptop" id="Lkurv" to="/kurv" onClick={closeAll}>
                        <div id="laptopKurvediv">
                            <img id="Lkurvikon" src={kurv} alt="Kurv" loading="lazy" />
                            <div>
                                <p id="LTæller">{antallet}</p>
                            </div>
                        </div>
                        <span id="kurvtekst">Kurv</span>
                    </NavLink>
                    <NavLink
                        className="navlink loginlaptop"
                        to="/login"
                        onClick={closeAll}
                    >
                        <img id="loginikon" src={login} alt="Logo" loading="lazy" />
                    </NavLink>
                </div>
                <NavLink className="navlink mobil" id="Mlogolink" to="/" onClick={closeAll}>
                    <img id="Mlogo" src={logo} alt="Logo" loading="lazy" />
                </NavLink>
            </div>
        </nav>
    );
}
