import { Box, styled } from '@mui/material';

import { MatxLogo } from '../components';
import useSettings from '../hooks/useSettings';

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // padding: '20px 18px 20px 29px',
  padding: '28px 18px 28px 18px',
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot backgroundColor="#ffffff">
      <Box display="flex" alignItems="center">
        <MatxLogo />
        {/* <StyledSpan mode={mode} className="sidenavHoverShow">
          OWL
        </StyledSpan> */}
      </Box>
      <Box
        className="sidenavHoverShow"
        sx={{ display: mode === 'compact' ? 'none' : 'block' }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
