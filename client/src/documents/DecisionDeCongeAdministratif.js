import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import ensa from "../images/ensaj1.png";
import ucd from "../images/Logo_UCD.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Fab from '@mui/material/Fab';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 24,
  };
class ComponentToPrint extends React.Component {
    render() {
        const { input1, input2, input3, input4, input5, input6, currentDate } = this.props
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
></Box>
<center>
    <div style={{ overflow: "auto", height: "100vh" , width:"87%", marginTop:'5%', marginRight:'20%'}}>
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
                    <br />
                    <div class="div2">
                        <h1>DECISION DE CONGE
                            <br />
                            ADMINISTRATIF</h1>
                    </div>
                    <br /><br />
                    <div class="div3">
                        <p> &ensp;&ensp;&ensp;&ensp;Vu le Dahir N°1.58.008 du 04 Chaâbane 1377 (24 Février 1958) portant statut particulier de la fonction publique.<br /></p>
                    </div>
                    <div class="div2">
                        <h4>Décide ce qui suit</h4>
                    </div>
                    <div class="div3">
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '0 0 auto' }}>
                                <b><u>Article 1</u>     : </b>
                            </div>
                            <div>
                                <p style={{ display: 'inline' }}> Un congé administratif est accordé à <b>{input1} {input2}</b> au titre de l'année du <b>{input3}</b> à <b>{input4}</b></p><br />
                            </div>
                        </div>
                        <div style={{ margin: "30px" }}>
                            <p><b>DOTI  </b>: <b>{input5}</b></p>
                            <p><b>GRADE </b>: <b>{input6}</b></p>
                        </div>
                        <b><u>Article 2</u>   : </b><p style={{ display: 'inline' }}>L’intéressée est autorisée à quitter le   territoire marocain durant la période
                            dès sa reprise de indiquée à l’article I.</p><br /><br />
                        <b><u>Article 3</u>   : </b><p style={{ display: 'inline' }}>L’intéressée est tenu(e) d’aviser le service compétent de sa  reprise
                            de service à l’expiration de ce congé.
                        </p>
                    </div>
                    <div class="div4" style={{ marginTop: '70px', marginBottom: '70px' }}>
                        <p> Fait à El Jadida, le <b>{currentDate}</b></p><br /><br />
                    </div>
                    <br />
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
                  </Fab>;;
                }}
                content={() => document.getElementById('print-content')}
                pageStyle="print"
            />
            <button onClick={() => { navigate(-1) }}>Retour</button>
            <ComponentToPrint ref={(el) => (componentRef = el)}
                input1={location.state.input1}
                input2={location.state.input2}
                input3={new Date(location.state.input3).toLocaleDateString("fr-FR")}
                input4={new Date(location.state.input4).toLocaleDateString("fr-FR")}
                input5={location.state.input5}
                input6={location.state.input6}
                currentDate={currentDate}
            /> {/* Utilisez la référence */}
        </div>
    );
}

