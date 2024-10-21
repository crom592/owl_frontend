import React, { useState } from 'react';
import { Box, IconButton, Stack, Typography, Divider, MenuItem, Menu } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  setMonth,
  getMonth,
  getYear,
  setYear,
} from 'date-fns';
import { ko } from 'date-fns/locale'; // 한국어 로케일 가져오기

function DateSelector({ selectedDate, onSelectDate }) {
  const currentYear = getYear(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);

  // 현재 주의 시작과 끝을 계산합니다.
  const startDateOfWeek = startOfWeek(currentDate, { locale: ko });
  const endDateOfWeek = endOfWeek(currentDate, { locale: ko });

  // 1주일 날짜 리스트를 생성합니다.
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(startDateOfWeek, i);
    dates.push({
      date,
      day: format(date, 'd', { locale: ko }),
      weekday: format(date, 'EEEE', { locale: ko }), // 요일을 풀네임으로 가져오기 (예: 월요일)
    });
  }

  // 연도 선택 핸들러
  const handleYearChange = (year) => {
    const newDate = setYear(currentDate, year);
    setCurrentDate(newDate);
    onSelectDate(newDate);
    setAnchorEl(null); // 드롭다운 닫기
  };

  // 월 선택 핸들러
  const handleMonthChange = (month) => {
    const newDate = setMonth(currentDate, month);
    setCurrentDate(newDate);
    onSelectDate(newDate);
  };

  const handlePrevWeek = () => {
    const newDate = subDays(currentDate, 7);
    setCurrentDate(newDate);
    onSelectDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
    onSelectDate(newDate);
  };

  const openYearMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeYearMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {/* Year and Month Selector */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start" // 구역을 왼쪽 정렬로 변경
        sx={{ marginBottom: '8px', padding: '10px 10px' }}
      >
        <Typography
          onClick={openYearMenu}
          sx={{
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '21px', // 년도의 글씨 크기를 줄임
            color: '#333',
            fontWeight: 'bold',
            minWidth: '100px', // 연도 영역의 최소 너비를 줄임
            '&:hover': {
              color: '#ff9800',
            },
          }}
        >
          {getYear(currentDate)}
        </Typography>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeYearMenu}>
          {[...Array(10).keys()].map((i) => (
            <MenuItem key={i} onClick={() => handleYearChange(currentYear - 5 + i)}>
              {currentYear - 5 + i}년
            </MenuItem>
          ))}
        </Menu>

        {/* 회색 선 */}
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#ddd', margin: '0px 20px' }} />

        <Stack direction="row" spacing={5} sx={{ flexWrap: 'wrap', marginLeft: '20px' }}>
          {[...Array(12).keys()].map((month) => (
            <Typography
              key={month}
              onClick={() => handleMonthChange(month)}
              sx={{
                cursor: 'pointer',
                fontSize: '15px', // 월의 글씨 크기를 더 키움
                color: getMonth(currentDate) === month ? '#ff9800' : '#888',
                fontWeight: getMonth(currentDate) === month ? 'bold' : 'normal',
                '&:hover': {
                  color: '#ff9800',
                },
              }}
            >
              {month + 1}월
            </Typography>
          ))}
        </Stack>
      </Stack>

      {/* 회색선 추가 */}
      <Divider sx={{ borderColor: '#ddd', marginBottom: '28px' }} />

      {/* Date Selector with Arrows */}
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
        <IconButton onClick={handlePrevWeek}>
          <ArrowBackIosIcon />
        </IconButton>
        {dates.map(({ date, day, weekday }) => (
          <Stack
            key={date}
            onClick={() => onSelectDate(date)}
            alignItems="center"
            sx={{
              cursor: 'pointer',
              padding: '4px 12px',
              borderRadius: '50%',
              backgroundColor:
                format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? '#ff9800'
                  : '#f1f1f1',
              color:
                format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? '#fff' : '#000',
              boxShadow:
                format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? '0 4px 8px rgba(0, 0, 0, 0.2)'
                  : 'none',
              '&:hover': {
                backgroundColor:
                  format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                    ? '#e68900'
                    : '#ddd',
              },
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>{day}</Typography>
            <Typography variant="caption">{weekday}</Typography>
          </Stack>
        ))}
        <IconButton onClick={handleNextWeek}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default DateSelector;
