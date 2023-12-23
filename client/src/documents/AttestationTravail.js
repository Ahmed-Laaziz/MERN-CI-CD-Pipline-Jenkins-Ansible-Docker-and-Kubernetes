import React, { useState } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ensa from "../images/ensaj1.png";
import ucd from "../images/Logo_UCD.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Fab from '@mui/material/Fab';
import { SxProps } from '@mui/system';
import "./docs.css" 

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 24,
  };
class ComponentToPrint extends React.Component {
    render() {
        const { input1, input2, input3, input4, input5, currentDate } = this.props

        // Convert the date string to a JavaScript Date object
const date = new Date(input5);

// Get the year, month, and day
const year = date.getFullYear();
// JavaScript months are 0-based (0 = January, 1 = February, etc.)
const month = date.getMonth() + 1; // Adding 1 to get a 1-based month
const day = date.getDate();
// Create a formatted date string in the "YYYY-MM-DD" format
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        return (

<Box sx={{ display: 'flex' }}>
        <Drawer role='Admin'/>
        
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                marginTop: "2%",
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "1%",
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add the boxShadow property
  }}
>
<center>
    <div style={{ overflow: "auto", position: "fixed" , height: "100vh" , margin:"auto", width:"80%"}}>
<div className="body" id="print-content">
                <div class="body" ref={el => { this.componentRef = el }}>
                    <div class="div1">
                        <div class="third"><img src={ensa} className="ucd-image" /></div>
                        <div class="third third-text">جامعة شعيب الدكالي<br />
                            المدرسة الوطنية للعلوم التطبيقية ــ الجديدة
                            <br />Ecole Nationale des Sciences Appliquées
                            <br />El Jadida - Maroc</div>
                        <div class="third"><img src={ucd} className="ucd-image" /></div>
                    </div>
                    <br /><br /><br />
                    <div class="div2">
                        <h1>ATTESTATION DE TRAVAIL</h1>
                    </div><br /><br />
                    <div class="div3" style={{ marginLeft: '20px', marginTop: '0px', fontSize: '20px' }}>
                        <p>&ensp;&ensp;&ensp;&ensp;&ensp;Le Directeur de l’Ecole Nationale des Sciences Appliquées d’El Jadida atteste que :</p>
                        <p>Nom et Prénom&ensp;&ensp;:<b>{input1} {input2}</b></p>
                        <p>Grade&ensp;&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; :<b>{input3}</b></p>
                        <p>Matricule P.P.R&ensp;&ensp;:<b>{input4}</b></p>
                        <p>&ensp;&ensp;&ensp;&ensp;&ensp;est en fonction à l’Ecole Nationale des Sciences Appliquées d’El Jadida depuis le <b>{formattedDate}</b> .</p>
                        <p>&ensp;&ensp;&ensp;&ensp;&ensp;La présente attestation est délivrée à l’intéressé(e), sur sa demande, pour servir et valoir ce que de droit.</p>
                    </div>
                    <div class="div4" style={{ marginBottom: '0px', marginTop: '0px' }}>
                        <p>El Jadida, le <b>{currentDate}</b></p><br /><br />
                    </div>
                    <br />
                    <div class="div5">
                        <p>Route Nationale N°1 (Route AZEMMOUR), Km 6, ELHAOUZIA</p>
                        <p>الطريق الوطنية رقم 1 (طريق أزمور)، كلم 6، الحوزية </p>
                    </div>
                    <div class="div6">
                        <p>BP : 5096 JAOUHARA El Jadida 24000. MAROC 24000</p>
                        <p>             ص.ب. :5096 جوهرة -الجديدة</p>
                    </div>
                    <div class="div7" style={{ marginBottom: '0px', marginTop: '0px' }}>
                        <p>   Téléphone : +212 523 39 56 79 +212 523 3448 22الهاتف :
                        </p><p>
                            fax : +212 523 39 49 15الفاكس:
                        </p><p>
                            www.ensaj.ucd.ac.ma</p>
                    </div>
                </div>
            </div>
            </div>
            </center>
</Box>

      </Box>



            
        );
    }
}

export default function Test() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const currentDate = new Date().toLocaleDateString("fr-FR");
    let componentRef; // Créez une référence pour le composant à imprimer
    return (
        <div>
            <ReactToPrint
                trigger={() => {
                    return <Fab sx = {fabStyle} color="primary" aria-label="add">
                    <LocalPrintshopIcon />
                  </Fab>;
                }}
                content={() => document.getElementById('print-content')}
                pageStyle="print"
            />
            <button onClick={() => { navigate('/test') }}>Retour</button>
            <ComponentToPrint ref={(el) => (componentRef = el)}
                input1={location.state.input1}
                input2={location.state.input2}
                input3={location.state.input3}
                input4={location.state.input4}
                input5={location.state.input5}
                currentDate={currentDate}
            /> {/* Utilisez la référence */}
        </div>
    );
}

