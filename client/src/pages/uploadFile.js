import FileUpload from '../components/upload/fileUpload';
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumb from '../components/breadcrumb';
export default function home(){
    return(
        <Box sx={{ display: 'flex' }}>
        <Drawer role='Admin' pageTitle={'Gestion des documents'}/>
        <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    marginTop: "5%",
    marginLeft: "0%",
    marginRight: "0%",
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add the boxShadow property
  }}
>
<Breadcrumb pageLabel="Envoi des documents administratifs"/>
<>&nbsp;</>
  <FileUpload />
</Box>

      </Box>
    )
}