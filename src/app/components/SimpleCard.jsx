import { Box, Button, Card, Stack, styled, Typography } from '@mui/material';

import hamburger from '/assets/images/icon/hamburger.svg';
import pencilPlus from '/assets/images/icon/pencilPlus.svg';

// STYLED COMPONENTS
const CardRoot = styled(Card)({
  height: '100%',
  padding: '20px 24px',
});

const CardTitle = styled('div')(({ subtitle }) => ({
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '117px',
  height: '42px',
  fontWeight: 'bold',
  borderRadius: '8px',
}));

const HeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0px',
  borderBottom: '1px solid #E8E8E8',
});

export default function SimpleCard({ children, title, subtitle, button }) {
  return (
    <CardRoot elevation={6}>
      <CardTitle subtitle={subtitle}>
        <HeaderBox className="calendar-header">
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">{title}</Typography>
          </Stack>
          {button && (
            <Box>
              <StyledButton
                variant="outlined"
                color="gray"
                sx={{ color: '#454545' }}
                startIcon={<img src={hamburger} alt="hamburgerIcon" style={{ width: '20px' }} />}
              >
                목록보기
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                startIcon={<img src={pencilPlus} alt="pencilPlusIcon" style={{ width: '20px' }} />}
              >
                수정
              </StyledButton>
            </Box>
          )}
        </HeaderBox>
        {subtitle && <Box mb={2}>{subtitle}</Box>}
        {children}
      </CardTitle>
    </CardRoot>
  );
}
