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

  const [hist, setHist] = React.useState([]);
  const [prof, setProf] = React.useState({});

  const isAdmin = agent && agent.__t === 'Admin';
  const isProfesseur = agent && agent.__t === 'Professeur';


  const { updateProf, updateHist } = useProf();

  const handleHistoriqueClick = async () => {
    console.log("prof id : " + hist[0].professeur)
    const hists = await axios.post(
      backLink+`/hist/prof-hist`, {"prof": hist[0].professeur} // Replace with your actual API endpoint
    );
    
    updateHist(hists.data);
    
    navigate("/historiques");
    // handleMenuClose();
  };
  const handleDocumentsClick = async () => {
    console.log("prof id : " + hist[0].professeur)
    const hists = await axios.get(
      backLink+`/FilesManagement/profFiles/${hist[0].professeur}`// Replace with your actual API endpoint
    );
    
    updateHist(hist[0].professeur);
    
    navigate("/files-download");
    // handleMenuClose();
  };

  const fetchHist = async () => {
    try {
      const response1 = await axios.post(
        `${backLink}/prof/email`, 
        {"email": agent.email} // Pass the agent ID to the API endpoint
      );
      setProf(response1.data)
      const response = await axios.post(
        `${backLink}/hist/prof-hist`, 
        {"prof": prof._id} // Pass the agent ID to the API endpoint
      );
      setHist(response.data);
      console.log("the setted hists are :")
      console.log(JSON.stringify(hist))
    } catch (error) {
      console.error('Error fetching hist data:', error);
    }
  };

  React.useEffect(() => {
    if(agent){
      fetchHist();
    }
  }, [agent]);

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
      
      {isProfesseur ? (
  <CardContent
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
    gap: 1.5,
  }}
>
  
  <FormControl>
    <FormLabel>Grade (الرتبة)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={(isProfesseur && agent && hist[0]?.grade) ? hist[0].grade : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <FormControl>
    <FormLabel>Classe (الدرجة)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={(isProfesseur && agent && hist[0]?.classe) ? hist[0].classe : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>

  <FormControl>
    <FormLabel>Numéro de loyer (رقم التأجير)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={(isProfesseur && agent && hist) ? agent.num_loyer : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <FormControl>
    <FormLabel>Numéro de preuve (الرقم الاستدلالي)</FormLabel>
    <Input endDecorator={<InfoOutlined />} defaultValue={(isProfesseur && agent && hist) ? agent.num_ref : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>

  </FormControl>

  <FormControl>
    <FormLabel>Date d'entrée dans la fonction publique (ت. و الوظيفة العمومية)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={(isProfesseur && agent && hist) ? agent.date_entre_ecole : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <FormControl>
    <FormLabel>Date d'entrée dans l'établissement (ت.و. المؤسسة)</FormLabel>
    <Input endDecorator={<InfoOutlined />} defaultValue={(isProfesseur && agent && hist) ? agent.date_fct_publique : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  {/* <Checkbox label="Change password" sx={{ gridColumn: '1/-1', my: 1 }} /> */}
<Button onClick={handleHistoriqueClick}>Voir Historique</Button>
<Button onClick={handleDocumentsClick}>Voir Documents</Button>
</CardContent>
) : isAdmin ? (
  <CardContent
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
    gap: 1.5,
  }}
>
  
  <FormControl>
    <FormLabel>Fonction (الوظيفة)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={isAdmin ? agent.fonction : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <FormControl>
    <FormLabel>Département (قسم)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={isAdmin ? agent.dep_label : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>


  
</CardContent>
) : (
  <></>
)}
      
    </Card>
  );
}