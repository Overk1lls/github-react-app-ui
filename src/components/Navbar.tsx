import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { User } from '../models/user';
import { signOut } from '../app/auth';

const infoToDisplay: Array<keyof User> = ['email', 'name'];

type NavbarProps = {
  user: User;
};

export default function Navbar({ user }: NavbarProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GitHubIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Github React App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          {infoToDisplay.map((info, i) => (
            <Box key={i} sx={{ flexGrow: 0, mr: 1 }}>
              <Typography sx={{ display: 'block', mr: '0.7rem' }}>
                {user[info]}
              </Typography>
            </Box>
          ))}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(e) => setAnchorElUser(e.currentTarget)}
                sx={{ p: 0 }}
              >
                <Avatar alt="current_user" src={user.avatar_url} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem key={0}>
                <Typography textAlign="center">
                  <Link href={user.html_url} underline="none" target="_blank">
                    Profile
                  </Link>
                </Typography>
              </MenuItem>

              <MenuItem key={1} onClick={() => signOut()}>
                <Typography textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, ml: 1 }}>
            <Tooltip title="Logout">
              <IconButton onClick={() => signOut()}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
