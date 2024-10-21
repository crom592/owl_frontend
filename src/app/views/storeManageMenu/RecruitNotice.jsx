import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';

import { Breadcrumb, SimpleCard } from '../../components';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

export default function RecruitNotice () {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            {
              name: '매장관리',
              path: '/material',
            },
            { name: '구인의 편지지' },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="구인의 편지지"></SimpleCard>
      </Stack>
    </Container>
  );
}
