import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import { useProf } from '../context/ProfContext';

const backLink = process.env.REACT_APP_BACK_LINK;

export default function ProfileData({ agent }) {
  const navigate = useNavigate();

  const [hist, setHist] = React.useState("");
  const [deps, setDeps] = React.useState([])

  const isAdmin = agent && agent.__t === 'Admin';
  const isProfesseur = agent && agent.__t === 'Professeur';
  const isFonc = agent && agent.__t === 'Fonctionnaire';

  const { prof, updateProf, updateHist } = useProf();

  const fetchDepartements = async () => {
    try {
      const response = await axios.get(`${backLink}/departements/all-departements`);
      const libeleValues = response.data.map((departement) => departement.libele);
      setDeps(libeleValues);
    } catch (error) {
      console.error('Error fetching departements:', error);
    }
  };

  const handleHistoriqueClick = async () => {
    const hists = await axios.post(
      `${backLink}/hist/prof-hist`, 
      {"prof": JSON.parse(hist)[0].professeur}
    );

    updateHist(hists.data);

    navigate("/historiques");
  };

  const handleDocumentsClick = async () => {
    const hists = await axios.get(
      `${backLink}/FilesManagement/profFiles/${JSON.parse(hist)[0].professeur}`
    );

    updateHist(JSON.parse(hist)[0].professeur);

    navigate("/files-download");
  };

  const fetchHist = async () => {
    try {
      const response = await axios.post(
        `${backLink}/hist/prof-hist`, 
        {"prof": prof._id}
      );
      setHist(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching hist data:', error);
    }
  };

  React.useEffect(() => {
    fetchDepartements();
  }, []);

  React.useEffect(() => {
    if (prof) {
      fetchHist();
    }
  }, [prof]);

  const ProfesseurContent = ({ agent, hist }) => (
    <>
             <CardContent
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                  gap: 1.5,
                }}
              >
                
                <FormControl>
                  <FormLabel>Grade (الرتبة)</FormLabel>
                  <Input endDecorator={<CreditCardIcon /> } defaultValue={(agent && hist && JSON.parse(hist)[0]?.grade) ? JSON.parse(hist)[0].grade : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Classe (الدرجة)</FormLabel>
                  <Input endDecorator={<CreditCardIcon /> } defaultValue={(agent && hist && JSON.parse(hist)[0]?.classe) ? JSON.parse(hist)[0].classe : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
                </FormControl>
  
                <FormControl>
                  <FormLabel>Service (قسم)</FormLabel>
                  <Input endDecorator={<CreditCardIcon /> } defaultValue={(agent && hist) ? agent.departement : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Numéro de preuve (الرقم الاستدلالي)</FormLabel>
                  <Input endDecorator={<InfoOutlined />} defaultValue={(agent && hist) ? agent.num_ref : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  
                </FormControl>
  
                
                {/* <Checkbox label="Change password" sx={{ gridColumn: '1/-1', my: 1 }} /> */}
              <Button onClick={handleHistoriqueClick}>Voir Historique</Button>
              <Button onClick={handleDocumentsClick}>Voir Documents</Button>
              </CardContent>
          </>
  );

  
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
        marginTop:'1%'
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
        {isAdmin ? 'Informations' : 'Informations'} 
      </Typography>
      <Divider inset="none" />
      
      {agent && agent.departement && deps.includes(agent.departement) ? (
        // Render the current card if agent.departement is in deps
        <>
           <CardContent
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                gap: 1.5,
              }}
            >
              
              <FormControl>
                <FormLabel>Grade (الرتبة)</FormLabel>
                <Input endDecorator={<CreditCardIcon /> } defaultValue={(agent && hist && JSON.parse(hist)[0]?.grade) ? JSON.parse(hist)[0].grade : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
              </FormControl>
              <FormControl>
                <FormLabel>Classe (الدرجة)</FormLabel>
                <Input endDecorator={<CreditCardIcon /> } defaultValue={(agent && hist && JSON.parse(hist)[0]?.classe) ? JSON.parse(hist)[0].classe : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
              </FormControl>

              <FormControl>
                <FormLabel>Numéro de loyer (رقم التأجير)</FormLabel>
                <Input endDecorator={<CreditCardIcon /> } defaultValue={(agent && hist) ? agent.num_loyer : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
              </FormControl>
              <FormControl>
                <FormLabel>Numéro de preuve (الرقم الاستدلالي)</FormLabel>
                <Input endDecorator={<InfoOutlined />} defaultValue={(agent && hist) ? agent.num_ref : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>

              </FormControl>

              <FormControl>
  <FormLabel>Date d'entrée dans la fonction publique (ت. و الوظيفة العمومية)</FormLabel>
  <Input
    endDecorator={<CreditCardIcon />}
    defaultValue={(agent && hist && agent.date_entre_ecole) ? new Date(agent.date_entre_ecole).toLocaleDateString('fr-FR') : 'Loading...'}
    disabled
    sx={{fontFamily:'bold'}}
  />
</FormControl>
<FormControl>
  <FormLabel>Date d'entrée dans l'établissement (ت.و. المؤسسة)</FormLabel>
  <Input
    endDecorator={<InfoOutlined />}
    defaultValue={(agent && hist && agent.date_fct_publique) ? new Date(agent.date_fct_publique).toLocaleDateString('fr-FR') : 'Loading...'}
    disabled
    sx={{fontFamily:'bold'}}
  />
</FormControl>
              {/* <Checkbox label="Change password" sx={{ gridColumn: '1/-1', my: 1 }} /> */}
            <Button onClick={handleHistoriqueClick}>Voir Historique</Button>
            <Button onClick={handleDocumentsClick}>Voir Documents</Button>
            </CardContent>
        </>
      ) : (
        // Render an alternative content if agent.departement is not in deps
        <>
           {isProfesseur ? (
               <ProfesseurContent agent={agent} hist={hist} />
            ) : isAdmin ? (
              <>
              </>
            ) : (
            <></>
        )}
        </>
      )}
    </Card>
  );
  
}

