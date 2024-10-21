import { Home, Menu, Person, PowerSettingsNew, Settings } from '@mui/icons-material';
import { Box, Hidden, IconButton, MenuItem, styled, useMediaQuery, useTheme } from '@mui/material';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//import useAuth from '../../../hooks/useAuth';
import useSettings from '../../../hooks/useSettings';
import { topBarHeight } from '../../../utils/constant';
import MatxMenu from '../../MatxMenu';
import { themeShadows } from '../../MatxTheme/themeColors';
import { Span } from '../../Typography';
import useAuth from '@/app/hooks/useAuth';

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({ color: theme.palette.text.primary }));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease',
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' },
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': {
    marginRight: '10px',
    color: theme.palette.text.primary,
  },
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  //const { logout1, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const Navigate = useNavigate();
  const { logout } = useAuth();
  // const logout = () => {
  //   Navigate('/session/signin');
  // };
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <IconBox></IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    {/* Hi <strong>{user.name}</strong> */}
                    <strong>TEST</strong>
                  </Span>
                </Hidden>
                {/* <Avatar src={user.avatar} sx={{ cursor: 'pointer' }} /> */}
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Home />
                <Span>Home</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Person />
                <Span>Profile</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Settings />
              <Span>Settings</Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <PowerSettingsNew />
              <Span>Logout</Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
