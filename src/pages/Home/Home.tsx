import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isSignedIn } from '../../app/auth';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar/Navbar';
import RepositoryList from '../../components/RepositoryList/RepositoryList';
import CommitsTable from '../../components/CommitsTable/CommitsTable';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

export default function HomePage() {
  const [org, setOrg] = useState('');

  if (!isSignedIn()) {
    <Navigate to="/" />;
  }

  const handleOrgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrg(e.target.value);
  };

  return (
    <Container>
      <Navbar />

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          m: '2rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="outlined-basic"
          label="Organization"
          variant="outlined"
          color="primary"
          sx={{ my: 2 }}
          value={org}
          onChange={handleOrgInput}
        />
        <RepositoryList org={org} />
      </Box>

      <CommitsTable org={org} />
    </Container>
  );
}
