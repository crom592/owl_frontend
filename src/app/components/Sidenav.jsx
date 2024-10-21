import { styled } from '@mui/system';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';

import { MatxVerticalNav } from '../components';
import { navigations } from '../navigations';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '0.5rem',
  paddingRight: '0rem',
  position: 'relative',
}));

const Sidenav = ({ children }) => {
  //const { settings, updateSettings } = useSettings();

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav items={navigations} />
      </StyledScrollBar>
    </Fragment>
  );
};

export default Sidenav;
