import { Grid, Stack } from '@mui/material';
import { Box, styled, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { SimpleCard } from '../../components';
import Calendar from '../../components/Calendar/WorkCalendar';
import CalendarTags from '../../components/CalendarTags';
import QRCodeGenerator from './QRCodeGenerator';
import DateSelector from './DateSelector';
import JobTable from './JobTable';
import { format } from 'date-fns';
const Container = styled('div')(({ theme }) => ({
  margin: '30px 0px 10px 30px',
  [theme.breakpoints.down('sm')]: { margin: '10px' },
  '& .breadcrumb': {
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: { marginBottom: '10px' },
  },
}));

export default function Home() {
  const jobsData = {
    '2024-09-03': [
      {
        time: '9:00 - 12:30',
        title:
          '구인글 제목 1길다길다길다다길다다길다다길다다길다다길다다길다다길다다길다다길다다길다다길다다길다',
        people: '2/3명',
        tag: '채용완료',
      },
      { time: '13:00 - 16:30', title: '구인글 제목 2', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 3', people: '1/3명', tag: '채용중' },
      { time: '9:00 - 12:30', title: '구인글 제목 4', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 5', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 6', people: '1/3명', tag: '채용중' },
      { time: '9:00 - 12:30', title: '구인글 제목 7', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 8', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 9', people: '1/3명', tag: '채용중' },
      { time: '9:00 - 12:30', title: '구인글 제목 10', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 11', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 12', people: '1/3명', tag: '채용중' },
    ],
    '2024-09-11': [
      { time: '9:00 - 12:30', title: '구인글 제목 7', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 8', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 9', people: '1/3명', tag: '채용중' },
      { time: '9:00 - 12:30', title: '구인글 제목 10', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 11', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 12', people: '1/3명', tag: '채용중' },
    ],
    '2024-09-12': [
      { time: '9:00 - 12:30', title: '구인글 제목 13', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 14', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 15', people: '1/3명', tag: '채용중' },
      { time: '9:00 - 12:30', title: '구인글 제목 16', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 17', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 18', people: '1/3명', tag: '채용중' },
    ],
    '2024-09-13': [
      { time: '9:00 - 12:30', title: '구인글 제목 19', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 20', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 21', people: '1/3명', tag: '채용중' },
      { time: '9:00 - 12:30', title: '구인글 제목 22', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 23', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 24', people: '1/3명', tag: '채용중' },
    ],
    '2024-09-14': [
      { time: '9:00 - 12:30', title: '구인글 제목 25', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 26', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 27', people: '1/3명', tag: '채용중' },
      { time: '9:00 - 12:30', title: '구인글 제목 28', people: '2/3명', tag: '채용완료' },
      { time: '13:00 - 16:30', title: '구인글 제목 29', people: '3/3명', tag: '채용완료' },
      { time: '17:00 - 20:30', title: '구인글 제목 30', people: '1/3명', tag: '채용중' },
    ],
    // 다른 날짜와 데이터 추가
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  console.log(formattedDate);
  return (
    <Container>
      <Grid container spacing={4}>
        {/* Left Side: Banner and Calendar */}
        <Grid item xs={12} md={8}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            {/* Banner */}
            <Box
              color="primary"
              sx={{
                height: '230px',
                overflow: 'hidden',
              }} // 배너 높이 제한
            >
              <img
                src="./assets/images/banner.png"
                alt="Banner"
                style={{
                  borderRadius: '15px',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>

            {/* Calendar */}
            <Card
              sx={{
                borderRadius: '15px',
                maxHeight: '800px',
                padding: '20px 20px',
                overflow: 'auto',
              }} // 캘린더 높이 조정
            >
              {/* <Calendar /> */}

              {/* <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ paddingTop: '20px' }}
              >
                <CalendarTags text="근무완료" color="blue" />
                <CalendarTags text="채용완료" color="orange" />
                <CalendarTags text="채용중" color="gray" />
              </Stack> */}
              <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              <JobTable jobs={jobsData[formattedDate] || []} />
            </Card>
          </Stack>
        </Grid>

        {/* Right Side: QR Code */}
        <Grid item xs={12} md={4}>
          <QRCodeGenerator userId={1234} />
        </Grid>
      </Grid>
    </Container>
  );
}
