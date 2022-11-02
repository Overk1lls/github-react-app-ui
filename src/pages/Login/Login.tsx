import { getConfig } from '../../app/config';
import { useAuth } from '../../hooks/useAuth';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../hooks/useAuth';

const { githubClientId } = getConfig();

export default function Login() {
  const [, isLoading, , error] = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {error && (
          <Alert severity="error" sx={{ m: 3 }}>
            {JSON.stringify(error)}
          </Alert>
        )}

        {isLoading && (
          <Alert severity="info" sx={{ m: 3 }}>
            Loading...
          </Alert>
        )}

        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" noValidate>
          <Button
            fullWidth
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${githubClientId}`}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            startIcon={<GitHubIcon />}
          >
            Github
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
