/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAccessToken } from '../app/auth';
import { getConfig } from '../app/config';
import { LocalStorageKeys } from '../app/const';
import { useLazyGetAccessTokenByCodeQuery } from '../features/auth/authAPI';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import Alert from '@mui/material/Alert';

const { redirectUrl, githubClientId } = getConfig();

interface LoginError {
  error: string;
  description: string;
}

export default function Login() {
  const [error, setError] = useState<LoginError>();
  const [triggerTokenQuery, state] = useLazyGetAccessTokenByCodeQuery();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (code) {
      localStorage.setItem(LocalStorageKeys.Code, code);

      // #TODO: catch an error
      triggerTokenQuery(code)
        .then(({ data }) => setAccessToken(data?.accessToken.access_token ?? ''))
        .then(() => navigate('/home'))
        .catch((error: Exclude<typeof state.error, undefined>) => console.log(error));
    } else if (error) {
      const description = searchParams.get('error_description');
      setError({
        error,
        description: description!.replaceAll('+', ' '),
      });
      navigate(pathname);
    }
  }, [search, pathname, state, navigate, triggerTokenQuery]);

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
            {error.description}
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
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${githubClientId}&redirect_uri=${redirectUrl}`}
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
