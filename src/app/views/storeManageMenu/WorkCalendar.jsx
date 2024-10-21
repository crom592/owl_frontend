import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';

import { Breadcrumb, SimpleCard } from '../../components';
import Calendar from '../../components/Calendar/WorkCalendar';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

export default function WorkCalendar () {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            {
              name: '매장관리',
              path: '/material',
            },
            { name: '구인 캘린더' },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="구인캘린더 페이지">
          <Calendar />
        </SimpleCard>
      </Stack>
    </Container>
  );
}
