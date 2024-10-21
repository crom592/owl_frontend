import { Box, Hidden, styled, Switch, useTheme } from '@mui/material';
import { memo } from 'react';

import useSettings from '../../../hooks/useSettings';
import { sidenavCompactWidth, sideNavWidth } from '../../../utils/constant';
import { convertHexToRGB } from '../../../utils/utils';
import Brand from '../../Brand';
import { themeShadows } from '../../MatxTheme/themeColors';
import Sidenav from '../../Sidenav';

// STYLED COMPONENTS
const SidebarNavRoot = styled(Box)(({ theme, width, bg, image }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
  backgroundSize: 'cover',

  zIndex: 111,
  overflow: 'hidden',
  color: theme.palette.text.primary,
  transition: 'all 250ms ease-in-out',
  backgroundImage: `linear-gradient(to bottom, rgba(${bg}, 0.96), rgba(${bg}, 0.96)), url(${image})`,
  '&:hover': {
    width: sideNavWidth,
    '& .sidenavHoverShow': { display: 'block' },
    '& .compactNavItem': {
      width: '100%',
      maxWidth: '100%',
      '& .nav-bullet': { display: 'block' },
      '& .nav-bullet-text': { display: 'none' },
    },
  },
}));

const NavListBox = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Layout1Sidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case 'compact':
        return sidenavCompactWidth;

      default:
        return sideNavWidth;
    }
  };

  const primaryRGB = convertHexToRGB(theme.palette.primary.main);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' });
  };

  return (
    <SidebarNavRoot image={bgImgURL} bg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Brand>
          <Hidden smDown>

          </Hidden>
        </Brand>
        <Sidenav />
      </NavListBox>
    </SidebarNavRoot>
  );
};

export default memo(Layout1Sidenav);
