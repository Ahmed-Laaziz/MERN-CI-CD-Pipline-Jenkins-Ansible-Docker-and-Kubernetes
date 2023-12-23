import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Test() {
    const navigate = useNavigate();
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const [input7, setInput7] = useState('');
    const [input8, setInput8] = useState('');
    const [input9, setInput9] = useState('');
    const [input10, setInput10] = useState('');
    return (
        <div>
            <form action="votre_script_de_traitement.php" method="post">
                <label for="input1">Input 1 :</label>
                <input type="text" id="input1" name="input1" onChange={(event) => setInput1(event.target.value)} /><br />

                <label for="input2">Input 2 :</label>
                <input type="text" id="input2" name="input2" onChange={(event) => setInput2(event.target.value)} /><br />

                <label for="input3">Input 3 :</label>
                <input type="date" id="input3" name="input3" onChange={(event) => setInput3(event.target.value)} /><br />

                <label for="input4">Input 4 :</label>
                <input type="date" id="input4" name="input4" onChange={(event) => setInput4(event.target.value)} /><br />

                <label for="input5">Input 5 :</label>
                <input type="text" id="input5" name="input5" onChange={(event) => setInput5(event.target.value)} /><br />

                <label for="input6">Input 6 :</label>
                <input type="text" id="input6" name="input6" onChange={(event) => setInput6(event.target.value)} /><br />

                <label for="input7">Input 7 :</label>
                <input type="text" id="input7" name="input7" onChange={(event) => setInput7(event.target.value)} /><br />

                <label for="input8">Input 8 :</label>
                <input type="text" id="input8" name="input8" onChange={(event) => setInput8(event.target.value)} /><br />

                <label for="input9">Input 9 :</label>
                <input type="text" id="input9" name="input9" onChange={(event) => setInput9(event.target.value)} /><br />

                <label for="input10">Input 10 :</label>
                <input type="text" id="input10" name="input10" onChange={(event) => setInput10(event.target.value)} /><br />
                <button onClick={() => { navigate('/quitterTerittoire', { state: { input1, input2, input3, input4, input5, input6, input7 } }) }}>Quitter le terittoire</button>
                <button onClick={() => { navigate('/repriseTravail', { state: { input1, input2, input3, input4, input5, input6, input7, input8, input9, input10 } }) }}>Reprise de travail</button>
                <button onClick={() => { navigate('/ordreMission', { state: { input1, input2, input3, input4, input5, input6, input7 } }) }}>Ordre De Mission</button>
                <button onClick={() => { navigate('/attestationTravail', { state: { input1, input2, input3, input4, input5 } }) }}>Attestation de Travail</button>
                <button onClick={() => { navigate('/demandeConge', { state: { input1, input2, input3, input4, input5, input6 } }) }}>Decision De Conge Administratif</button>

            </form>
        </div>
    );
}
