
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem, LinearProgress, Box } from '@mui/material';
import Grid from '@mui/joy/Grid';
import Autocomplete from '@mui/joy/Autocomplete';
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

    const [selectedProfessor, setSelectedProfessor] = useState('');

    const handleSelectChange = (event, newValue) => {
        // setSelectedProfId(e.target.value);
        // console.log(selectedProfId);
        setSelectedProfessor(newValue);
        if (newValue) {
        // Store the ID of the selected professor
        const professorId = newValue._id;
        setSelectedProfId(professorId); // Update selectedProfId state with the professor's ID
        }
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
            {/* <center><h3>Envoi des documents</h3></center> */}
            <form className="formStyle" onSubmit={submitImage}>
                {/* <FormControl fullWidth>
                    <InputLabel id="select-professor-label">Selectionner un fonctionnaire</InputLabel>
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
                </FormControl> */}



                <FormControl fullWidth>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <InputLabel htmlFor="professor-select"><b>Selectionner un fonctionnaire:</b></InputLabel>
        </Grid>
        <Grid item xs={9}>
          <Autocomplete
            id="professor-select"
            options={professors}
            getOptionLabel={(professor) =>
              professor ? `${professor.prenom.split('|')[0]} ${professor.nom.split('|')[0]} | ${professor.prenom.split('|')[1]} ${professor.nom.split('|')[1]}` : ''
            }
            value={selectedProfessor}
            onChange={handleSelectChange} // Use the custom handler for Autocomplete change
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Search professors"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </FormControl>



                <br />
                <div>&nbsp;</div>
                <FormControl fullWidth>
                <Grid container alignItems="center">
                <Grid item xs={3}>
          <InputLabel htmlFor="outlined-basic"><b>Ajouter un titre:</b></InputLabel>
        </Grid>
        <Grid item xs={9}>
                <TextField
                    id="outlined-basic" variant="outlined"
                    type="text"
                    className="form-control"
                    value={title}
                    required
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                />
                </Grid>
                </Grid>
                </FormControl>
                <br />
                <div>&nbsp;</div>
                <center>
                <Grid container alignItems="center" justifyContent="center" sx={{height: "20%" ,width: "40%"}} >
                    <label htmlFor="upload-file">
                        <Input
                            id="upload-file"
                            type="file"
                            inputProps={{ accept: 'application/pdf' }}
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: 'none', borderBlockColor: 'white', color:"white", borderColor:"white"}}
                        />
                        
                        <Button
                            variant="outlined"
                            component="span"
                            // startIcon={<CloudUploadIcon />}
                        >
                            {!showSuccessMessage && (
                             <img src="https://colorlib.com/wp-content/uploads/sites/2/jquery-file-upload-scripts.png" height={"20%"} width={"90%"}></img>
                            )}
                        </Button>
                    </label>
                    {file && !showSuccessMessage && (
                        <Typography variant="body1" gutterBottom>
                            fichier choisi: {file.name}
                            
                        </Typography>
                    )}
                    {showSuccessMessage && (
                        <Typography variant="body1" gutterBottom>
                            <img src="https://assets.materialup.com/uploads/c8a1e109-dca0-4b9e-9aa6-1e339b5ba903/preview.gif" height={"80%"} width={"80%"}></img>
                        </Typography>
                    )}
                </Grid>
                
                <br />
                <Button variant="contained" endIcon={<SendIcon />} type="submit">
                    Envoyer
                </Button>
                </center>
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

