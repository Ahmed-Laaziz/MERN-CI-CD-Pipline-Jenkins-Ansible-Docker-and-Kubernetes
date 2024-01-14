import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import ensa from "../image/ensaj1.png";
import ucd from "../image/Logo_UCD.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

class ComponentToPrint extends React.Component {
    render() {
        const { input1, input2, input3, input4, input5, input6, input7, input8, input9, input10 } = this.props
        return (
            <div className="body">
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
                        <h1>استــئــنـــاف العمـــل
                            <br />
                            ***************</h1>
                    </div>
                    <br /><br />
                    <div class="div8">
                        <div></div>
                        <div>
                            <p>:  &ensp;&ensp;&ensp;&ensp;الاسم العائلــي</p>
                            <p>:   &ensp;&ensp;الاسم الشخصــي</p>
                            <p>:      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;الإطـــار</p>
                            <p>: &ensp;&ensp;&ensp;&ensp;الرقم المالــي</p>
                            <p>:  &ensp;&ensp;&ensp;تاريخ التغيــب</p>
                            <p>:          &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;سببــــه</p>
                            <p>:    &ensp;&ensp;&ensp;تاريخ الالتحاق</p>
                        </div>
                    </div>
                    <div class="div2" style={{ fontSize: '20px' }}>
                        <p>الجديدة في</p>
                        <div class="div8" style={{ marginLeft: '120px', marginRight: '120px', marginBottom: '90px' }}>
                            <div><p>:المدير</p></div>
                            <div>
                                <p>:الموظف</p>
                            </div>
                        </div>
                    </div>
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
            </div >
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
                    return <button>Imprimer l'attestation</button>;
                }}
                content={() => componentRef}
                pageStyle="print"
            />
            <button onClick={() => { navigate('/test') }}>Retour</button>
            <ComponentToPrint ref={(el) => (componentRef = el)}
                input1={location.state.input1}
                input2={location.state.input2}
                input3={location.state.input3}
                input4={location.state.input4}
                input5={location.state.input5}
                input6={location.state.input6}
                input7={location.state.input7}
                input8={location.state.input8}
                input9={location.state.input9}
                input10={location.state.input10}
            /> {/* Utilisez la référence */}
        </div>
    );
}

