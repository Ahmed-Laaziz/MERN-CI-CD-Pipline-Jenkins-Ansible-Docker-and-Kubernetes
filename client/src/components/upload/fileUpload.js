
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@mui/material';

import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';

function App() {
    const backLink = process.env.REACT_APP_BACK_LINK;
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [allImage, setAllImage] = useState(null);
    const [professors, setProfessors] = useState([]);
    const [selectedProfId, setSelectedProfId] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const formatDateToDatetime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const currentDate = new Date();
    const currentDatetime = formatDateToDatetime(currentDate);

    useEffect(() => {
        async function fetchProfessors() {
            try {
                const response = await axios.get(backLink + '/prof/professeurs');
                setProfessors(response.data);
            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        }

        fetchProfessors();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedProfId(e.target.value);
    };

    const submitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("professeurId", selectedProfId);

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            },
        };

        try {
            setIsUploading(true);
            const result = await axios.post(
                backLink + "/FilesManagement/upload-files",
                formData,
                config
            );

            if (result.data.status === "ok") {
                const res = await axios.post(backLink + '/notifs/add-notification', { "prof": selectedProfId, "title": "Nouveau document envoyé", "message": "Nous tenons à vous informer que vous avez reçu un nouveau document. Merci !", "date": currentDatetime });
                setTitle("");
                setFile("");
                setIsUploading(false);
                setUploadProgress(0);
                setShowSuccessMessage(true);

                // Hide the success message after 5 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setIsUploading(false);
        }
    };

    const showPdf = (pdf) => {
        const pdfUrl = backLink + `/files/${pdf}`;
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="App">
            <center><h3>Envoi des documents</h3></center>
            <form className="formStyle" onSubmit={submitImage}>
                <FormControl fullWidth>
                    <InputLabel id="select-professor-label">Selectionner un employé</InputLabel>
                    <Select
                        labelId="select-professor-label"
                        id="select-professor"
                        value={selectedProfId}
                        onChange={handleSelectChange}
                        label="Select Professor"
                        required
                    >
                        <MenuItem value="">Selectionner un professeur</MenuItem>
                        {professors.map((prof) => (
                            <MenuItem key={prof._id} value={prof._id}>
                                {prof ? prof.prenom.split('|')[0] + " " + prof.nom.split('|')[0] + "   |   " + prof.prenom.split('|')[1] + " " + prof.nom.split('|')[1] : 'Loading...'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <div>&nbsp;</div>
                <TextField
                    id="outlined-basic" label="Ajouter un titre" variant="outlined"
                    type="text"
                    className="form-control"
                    value={title}
                    required
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <div>&nbsp;</div>
                <div>
                    <label htmlFor="upload-file">
                        <Input
                            id="upload-file"
                            type="file"
                            inputProps={{ accept: 'application/pdf' }}
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: 'none' }}
                        />
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            Choisir un fichier
                        </Button>
                    </label>
                    {file && !showSuccessMessage && (
                        <Typography variant="body1" gutterBottom>
                            fichier choisi: {file.name}
                        </Typography>
                    )}
                    {showSuccessMessage && (
                        <Typography variant="body1" gutterBottom>
                            Fichier téléchargé avec succès!
                        </Typography>
                    )}
                </div>
                <br />
                <Button variant="contained" endIcon={<SendIcon />} type="submit">
                    Envoyer
                </Button>
            </form>
            <div>
              &nbsp;
            </div>
            {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />}
            <div className="uploaded">
                <div className="output-div">
                    {allImage == null
                        ? ""
                        : allImage.map((data) => {
                            return (
                                <div className="inner-div">
                                    <h6>Title: {data.title}</h6>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => showPdf(data.pdf)}
                                    >
                                        Show Pdf
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default App;

