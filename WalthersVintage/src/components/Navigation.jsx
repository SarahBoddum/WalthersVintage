import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/Images/wvlogo.png';
import kurv from '../assets/Images/kurv.svg';
import login from '../assets/Images/login.svg'

export default function Navigation() {
    const [burgerActive, setBurgerActive] = useState(false);
    const toggleBurger = () => {
        setBurgerActive(!burgerActive);
    }

    const [krydsActive, setKrydsActive] = useState(false);
    const toggleKryds = () => {
        setKrydsActive(!krydsActive);
    }

    // Separate states for "Om" and "Produkter" dropdowns
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleDropdownClick = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);  // Close if the same dropdown is clicked again
        } else {
            setActiveDropdown(dropdown);  // Open the selected dropdown and close others
        }
    };

    const closeAll = () => {
        setBurgerActive(false);
        setKrydsActive(false);
        setActiveDropdown(null);  // Close all dropdowns
    };

    return (
        <nav className="navigation" id="navbar">
            <div id='mobilheader'>
                <div id="mobilIkoner">
                    <NavLink className={"mobil"} to="/login" onClick={closeAll}><img id="loginikon" src={login} alt="Logo"></img></NavLink>
                    <NavLink className="navlink mobil" id="Mkurv" to="/kurv" onClick={closeAll}><img id="Mkurvikon" src={kurv} alt="Kurv" loading="lazy"></img><span id="kurvtekst">Kurv</span></NavLink>
                </div>
                <div className={krydsActive ? 'close' : null} onClick={() => {
                    toggleBurger();
                    toggleKryds();
                }} id="burger-menu">
                    <span></span>
                </div>
            </div>
            
            <div id="menu" className={burgerActive ? 'overlay' : null}>
                <div id="xul">
                    <div className="dropdown">
                        <div className="navlink" id="om" onClick={() => handleDropdownClick("om")}>
                            <div className="mobil Mcirkel"></div>Om
                        </div>
                        
                        {/* Show "Om" dropdown content only if active */}
                        {activeDropdown === "om" && (
                            <div className="dropdown-content">
                                <NavLink className="navlink" to="/om" onClick={closeAll}><div className="mobil Mcirkel"></div>Om Walthers Vintage</NavLink>
                                <NavLink className="navlink" to="/faq" onClick={closeAll}><div className="mobil Mcirkel"></div>FAQ</NavLink>
                                <NavLink className="navlink" to="/betingelser" onClick={closeAll}><div className="mobil Mcirkel"></div>Betingelser</NavLink>
                                <NavLink className="navlink" to="/kontakt" onClick={closeAll}><div className="mobil Mcirkel"></div>Kontakt</NavLink>
                            </div>
                        )}
                    </div>
                    
                    <div className="dropdown">
                        <div className="navlink" id="produkt" onClick={() => handleDropdownClick("produkt")}>
                            <div className="mobil Mcirkel"></div>Produkter
                        </div>
                        
                        {/* Show "Produkter" dropdown content only if active */}
                        {activeDropdown === "produkt" && (
                            <div className="dropdown-content" id="produktDD">
                                <NavLink className="navlink" to="/stitchstories" onClick={closeAll}><div className="mobil Mcirkel"></div>Stitch_Stories</NavLink>
                                <NavLink className="navlink" to="/vintage" onClick={closeAll}><div className="mobil Mcirkel"></div>Vintage</NavLink>
                                <NavLink className="navlink" to="/upcycled" onClick={closeAll}><div className="mobil Mcirkel"></div>Upcycled</NavLink>
                                <NavLink className="navlink" to="/strguide" onClick={closeAll}><div className="mobil Mcirkel"></div>Størrelsesguide</NavLink>
                            </div>
                        )}
                    </div>
                    
                    <NavLink className="navlink HJÆLP" to="/baredygtig" onClick={closeAll}><div className="mobil Mcirkel"></div>Mit Håndværk</NavLink>
                    <NavLink className={"navlink laptop"} id="logolink" to="/forsidepage" onClick={closeAll}><img id="logo" src={logo} alt="Logo"></img></NavLink>
                    <NavLink className="navlink laptop" id="Lkurv" to="/kurv" onClick={closeAll}><img id="Lkurvikon" src={kurv} alt="Kurv" loading="lazy"></img><span id="kurvtekst">Kurv</span></NavLink>
                    <NavLink className={"navlink loginlaptop"} to="/login" onClick={closeAll}><img id="loginikon" src={login} alt="Logo"></img></NavLink>
                </div>
                <NavLink className={"navlink mobil"} id="Mlogolink" to="/" onClick={closeAll}><img id="Mlogo" src={logo} alt="Logo" loading="lazy"></img></NavLink>
            </div>
        </nav>
    );
}