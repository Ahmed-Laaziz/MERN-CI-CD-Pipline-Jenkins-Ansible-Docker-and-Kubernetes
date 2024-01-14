import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import ensa from "../images/ensaj1.png";
import ucd from "../images/Logo_UCD.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 24,
  };
class ComponentToPrint extends React.Component {
    render() {
        const { input1, input2, input3, input4, input5, input6, input7, currentDate } = this.props
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
    <div style={{ overflow: "auto", position: "fixed" , height: "100vh" , margin:"auto", width:"90%"}}>
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
                        <h1>ORDRE DE MISSION</h1>
                    </div><br /><br />
                    <div class="div3" style={{ marginLeft: '20px', marginTop: '20px', fontSize: '20px' }}>
                        <p>N° : <b>{input1}</b></p>
                        <p>Le Directeur de l’Ecole Nationale des Sciences Appliquées d’El Jadida</p>
                        <p>Ordonne à Mr&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;: <b>{input5}</b></p>
                        <p>De se rendre en mission à&ensp;&ensp;: <b>{input6}</b></p>
                        <p>Objet de la mission &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;:<b>{input7}</b></p>
                        <p>Moyen de transport&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;: <b>{input2}</b></p>
                        <p>Période de validité&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;:  du <b>{input3}</b> au <b>{input4}</b></p>
                    </div>
                    <div class="div4" style={{ marginBottom: '1px', marginTop: '1px' }}>
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
                    <div class="div7">
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
                input3={new Date(location.state.input3).toLocaleDateString("fr-FR")}
                input4={new Date(location.state.input4).toLocaleDateString("fr-FR")}
                input5={location.state.input5}
                input6={location.state.input6}
                input7={location.state.input7}
                currentDate={currentDate}
            /> {/* Utilisez la référence */}
        </div>
    );
}

