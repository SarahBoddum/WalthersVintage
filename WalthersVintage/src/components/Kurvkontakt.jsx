import React, { useState } from 'react';
import { useKurv } from '../components/KurvContext';
import { getDoc, doc } from "firebase/firestore"; 
import { db, auth } from '../Data/firebase'; 
import { Link } from 'react-router-dom';

export const KurvKontakt = (props) => {
    const { LisbethKontakt, laptopLisbeth, kontakth1, content, kontakth1nr2, prisBlockMNone, kurvBlockNone } = props;
    const { kurvData, removeFromKurv } = useKurv();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ brystmål: null, taljemål: null, hoftemål: null, type: [] });
    const [emailError, setEmailError] = useState(''); // Til valideringsfejl
    const [nameError, setNameError] = useState('');   // Til valideringsfejl
    const [formSent, setFormSent] = useState(false); // Tilføjet state for at vise bekræftelse

    const fetchUserMeasurements = async (userId) => {
        try {
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                const data = userDoc.data();
                return { bryst: data.bryst, talje: data.talje, hofte: data.hofte, hojde: data.hojde };
            }
            console.error("No such user data!");
            return null;
        } catch (error) {
            console.error("Error fetching user data: ", error);
            return null;
        }
    };

    const handleUseMyMeasurements = async () => {
        if (!auth.currentUser) return;
        const userId = auth.currentUser.uid;
        const measurements = await fetchUserMeasurements(userId);
        if (measurements) {
            setFilter({
                brystmål: parseInt(measurements.bryst, 10),
                taljemål: parseInt(measurements.talje, 10),
                hoftemål: parseInt(measurements.hofte, 10),
                hojdemål: parseInt(measurements.hojde, 10),
            });
        }
    };

    const handleFjernProdukt = (produktId) => {
        removeFromKurv(produktId);
    };

    // Validering af email
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
            setEmailError('Indtast en gyldig e-mailadresse.');
            return false;
        }
        setEmailError('');
        return true;
    };

    // Validering af navn
    const validateName = (value) => {
        if (!value.trim()) {
            setNameError('Navn kan ikke være tomt.');
            return false;
        }
        setNameError('');
        return true;
    };

    const handleSend = async () => {
        // Udfør validering
        const isEmailValid = validateEmail(email);
        const isNameValid = validateName(name);
    
        // Hvis enten e-mail eller navn ikke er gyldige, stop afsendelsen
        if (!isEmailValid || !isNameValid) {
            setError("Udfyld venligst alle felter korrekt."); // Sæt en generel fejlbesked
            return; // Stop her
        }
    
        const kurvDetails = kurvData.map((produkt) => 
            `Produkt: ${produkt.overskrift}, Id: ${produkt.id}, Pris: ${produkt.pris} DKK`
        ).join('\n');

        const samletPris = kurvData.reduce((total, produkt) => total + parseFloat(produkt.pris), 0);

        const requestBody = {
            customerEmail: email,
            subject: `Forespørgsel fra ${name}`,
            body: `
                Navn: ${name}
                Email: ${email}
                Besked: ${message}
                Udvalgte produkter:
                ${kurvDetails || 'Ingen produkter valgt'}
                Samlet pris: ${samletPris} DKK
                Mål: 
                Bryst: ${filter.brystmål || 'Ikke angivet'}, 
                Talje: ${filter.taljemål || 'Ikke angivet'}, 
                Hofte: ${filter.hoftemål || 'Ikke angivet'}, 
                Højde: ${filter.hojdemål || 'Ikke angivet'}
            `
        };

        const orderConfirmationRequestBody = {
            reciverEmail: email,
            subject: `Ordrebekræftelse fra Lisbeth`,
            body: `
                Hej ${name},
                Tak for din forespørgsel!
                Her er en oversigt over dine valgte produkter:
                Vi vender tilbage hurtigst muligt med yderligere information.
            `
        };

        try {
            // Send besked til Lisbeth
            const response = await fetch("https://walterapi-fee4eka3cggqf2ad.northeurope-01.azurewebsites.net/api/Mail/SendMail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setResponse("Din besked blev sendt til Lisbeth!");
            setFormSent(true); // Skjul formular og vis bekræftelsesbesked
            setError(null);
        } catch (err) {
            console.error("Fejl ved afsendelse af besked:", err);
            setError("Der opstod en fejl. Prøv venligst igen.");
        }

        try {
            // Send ordrebekræftelse til kunden
            const response = await fetch("https://walterapi-fee4eka3cggqf2ad.northeurope-01.azurewebsites.net/api/Mail/SendOrderConfirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderConfirmationRequestBody),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setResponse("Ordrebekræftelse sendt til kunden!");
            setFormSent(true); // Skjul formular og vis bekræftelsesbesked
            setError(null);
        } catch (err) {
            console.error("Fejl ved afsendelse af ordrebekræftelse:", err);
            setError("Der opstod en fejl. Prøv venligst igen.");
        }
    };

    return (
        <div id='KurvKontakt'>
            <div id='KKtop'>
                <img src={LisbethKontakt} className='KKimg mobil' alt='Lisbeth' />
                <div id='KKtext'>
                    <h1 className='laptop'>{kontakth1}</h1>
                    <h1 className='mobil'>{kontakth1nr2}</h1>
                    <p>{content}</p>
                </div>
            </div>
        
            <div id='formularImg'>
                <img src={laptopLisbeth} className='KKimgStor laptop' alt='Lisbeth' />
                
                {!formSent ? (
                    <div id='kontaktformular'>
                        {/* Din eksisterende formular-kode */}
                        <div className='inputKontakt'>
                        <div className='mailEmne'>
                            <label className='labelKontakt'>Mail :</label>
                            <input
                                className='inputKontakt'
                                placeholder='din-mail@email.com'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value); // Valider e-mail under indtastning
                                }}
                            />
                            {emailError && <p className='error'>{emailError}</p>}
                        </div>
                        <div className='mailEmne'>
                            <label className='labelKontakt'>Navn :</label>
                            <input
                                className='inputKontakt'
                                placeholder='______________'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    validateName(e.target.value); // Valider navn under indtastning
                                }}
                            />
                            {nameError && <p className='error'>{nameError}</p>}
                        </div>
                        </div>
                        <div className='kontaktBeskedFlex'>    
                            <div className='inputdiv'>
                                <textarea
                                    id='inputbesked'
                                    placeholder='Din besked...'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='inputdiv forminputdiv'>
                                {kurvData.length > 0 && (
                                    kurvData.map((produkt, index) => (
                                        <div key={index} className="kurv-produkt">
                                            <img src={produkt.billede} alt={`Produkt ${index + 1}`} />
                                            <div className='produkttekst'>
                                                <h2>{produkt.overskrift}</h2>
                                                <p>Pris: {produkt.pris} DKK</p>
                                                <button onClick={() => handleFjernProdukt(produkt.id)}>Fjern</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <p className='samlet-pris'>Samlet pris: {kurvData.reduce((total, produkt) => total + parseFloat(produkt.pris), 0).toFixed(2)} DKK</p>
                                <div className={`kurv-mål ${kurvBlockNone}`}>
                                    <div className='OvalKnap kurvbtn' 
                                        onClick={() => {
                                        if (!auth.currentUser) {
                                        alert("Log ind eller opret en profil for at bruge dine mål");
                                        } else {
                                        handleUseMyMeasurements();
                                        }
                                        }}>
                                        Brug mine mål
                                    </div>
                                    <input className='KurvInput' id='Bryst'
                                        type="number"
                                        value={filter.brystmål || ''} 
                                        onChange={(e) => setFilter({ ...filter, brystmål: parseInt(e.target.value) })}
                                        placeholder='Dit brystmål, hvor du er bredest'>
                                    </input>
                                    <input className='KurvInput' id='Talje'
                                        type="number"
                                        value={filter.taljemål || ''} 
                                        onChange={(e) => setFilter({ ...filter, taljemål: parseInt(e.target.value) })}
                                        placeholder='Dit taljemål, hvor du er smallest'>
                                    </input>
                                    <input className='KurvInput' id='Hofte'
                                        type="number"
                                        value={filter.hoftemål || ''} 
                                        onChange={(e) => setFilter({ ...filter, hoftemål: parseInt(e.target.value) })}
                                        placeholder='Dit hoftemål, hvor du er bredest'>
                                    </input>
                                    <input className='KurvInput' id='Højde'
                                        type="number"
                                        value={filter.hojdemål || ''} 
                                        onChange={(e) => setFilter({ ...filter, hojdemål: parseInt(e.target.value) })}
                                        placeholder='Din højde i cm'>
                                    </input>

                                </div>
                            </div>
                        </div>   
                        <div className='KnapDiv3 KKknap'>
                            <button className='OvalKnap' onClick={handleSend}>Send</button>
                        </div>
                        {response && <p>{response}</p>}
                        {error && <p>{error}</p>}
                    </div>
                ) : (
                    <div id="whenSent">
                        <h1>Tak for din besked, {name}</h1>
                        <p>Tak for din henvendelse!<br />
                            Jeg har modtaget din mail og sendt dig et automatisk svar med de oplysninger, du skal bruge, hvis du skulle ønske at returnere varen senere. 
                            Jeg vender tilbage med et personligt svar hurtigst muligt.

                                <br /><br />
                            Hvis du ikke allerede har sat dig ind i mine betingelser, vil jeg anbefale dig at læse om dem her, så du ved hvordan du skal forholde dig i forbindelse med returnering for eksempel.
                        </p>
                        <Link className='OvalKnap' to="/betingelser">Betingelser</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KurvKontakt;
