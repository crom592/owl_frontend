import { red } from '@mui/material/colors';

import { components } from './components';

const themeOptions = {
  typography: {
    fontFamily: 'Pretendard, sans-serif',
    fontSize: 14,
    displayL: {
      fontSize: '56px',
      lineHeight: '61.6px',
      fontWeight: 700,
    },
    displayM: {
      fontSize: '48px',
      lineHeight: '52.8px',
      fontWeight: 700,
    },
    displayS: {
      fontSize: '40px',
      lineHeight: '44px',
      fontWeight: 700,
    },
    h1: {
      fontSize: '32px',
      lineHeight: '35.2px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '24px',
      lineHeight: '26.4px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '20px',
      lineHeight: '22px',
      fontWeight: 600,
    },
    bodyLB: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 700,
    },
    bodyLR: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 400,
    },
    bodyMB: {
      fontSize: '18px',
      lineHeight: '25.2px',
      fontWeight: 700,
    },
    bodyMR: {
      fontSize: '18px',
      lineHeight: '25.2px',
      fontWeight: 400,
    },
    bodyNB: {
      fontSize: '16px',
      lineHeight: '25.2px',
      fontWeight: 700,
    },
    bodyNR: {
      fontSize: '16px',
      lineHeight: '25.2px',
      fontWeight: 400,
    },
    bodySB: {
      fontSize: '14px',
      lineHeight: '19.6px',
      fontWeight: 700,
    },
    bodySR: {
      fontSize: '14px',
      lineHeight: '19.6px',
      fontWeight: 400,
    },
  },

  status: { danger: red[500] },
  components: { ...components },
};

export default themeOptions;
