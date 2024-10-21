import './WorkCalendar.css';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Person } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Holidays from 'date-holidays';
import React, { useEffect, useState } from 'react';

import CalendarTags from '../CalendarTags';
import FullScreenDialog from './FullScreenDialog';

let data = [
  {
    time: {
      start: new Date(2024, 4, 14, 7, 0),
      end: new Date(2024, 4, 14, 12, 0),
    },
    allDay: false,
    status: '근무완료',
    person: '3/3',
  },
  {
    time: {
      start: new Date(2024, 4, 14, 7, 0),
      end: new Date(2024, 4, 14, 12, 0),
    },
    allDay: false,
    status: '근무완료',
    person: '3/3',
  },
  {
    time: {
      start: new Date(2024, 4, 14, 7, 0),
      end: new Date(2024, 4, 14, 12, 0),
    },
    allDay: false,
    status: '근무완료',
    person: '3/3',
  },
  {
    time: {
      start: new Date(2024, 4, 14, 7, 0),
      end: new Date(2024, 4, 14, 12, 0),
    },
    allDay: false,
    status: '근무완료',
    person: '3/3',
  },
  {
    time: {
      start: new Date(2024, 4, 14, 7, 0),
      end: new Date(2024, 4, 14, 16, 0),
    },
    allDay: false,
    status: '근무완료',
    person: '3/3',
  },
  {
    time: {
      start: new Date(2024, 6, 17, 7, 0),
      end: new Date(2024, 6, 17, 12, 0),
    },
    allDay: false,
    status: '채용완료',
    person: '2/3',
  },
  {
    time: {
      start: new Date(2024, 4, 15, 12, 0),
      end: new Date(2024, 4, 15, 16, 0),
    },
    allDay: false,
    status: '채용중',
    person: '1/3',
  },
];

const WorkCalendar = () => {
  const [eventsData, setEventsData] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [onConfirm, setOnConfirm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [updateEvent, setUpdateEvent] = useState(null);

  useEffect(() => {
    const hd = new Holidays('KR');

    const formattedHolidays = hd.getHolidays(new Date().getFullYear()).map((holiday) => ({
      title: holiday.name,
      date: holiday.date,
      className: 'holiday',
    }));
    setHolidayEvents(formattedHolidays);
  }, []);

  useEffect(() => {
    const newEventsData = data.map((item) => ({
      title: `${formattedTime(item.time.start)}-${formattedTime(item.time.end)}`,
      start: item.time.start,
      end: item.time.end,
      allDay: item.allDay,
      status: item.status,
      person: item.person,
    }));
    setEventsData(newEventsData);
  }, []);

  const formattedTime = (date) => {
    const newdate = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return newdate;
  };

  const renderEventContent = (eventInfo) => {
    const status = eventInfo.event.extendedProps.status;
    if (status === undefined) return eventInfo.event.title;

    const colorChange = () => {
      if (status === '채용중') return 'gray';
      else if (status === '채용완료') return 'orange';
      else if (status === '근무완료') return 'blue';
    };

    return (
      <CalendarTags color={colorChange()} text={eventInfo.event.title}>
        <Person sx={{ fontSize: '20px' }} />
        <Typography sx={{
          fontSize: '12.29px',
          fontWeight: 'bold',
        }}>{eventInfo.event.extendedProps.person}명</Typography>
      </CalendarTags>
    );
  };

  // 더보기 링크 커스터마이즈
  const moreLinkText = (num) => {
    return `+${num}`;
  };

  // 요일 셀 내용 커스터마이즈
  const renderDayHeaderContent = (dayHeader) => {
    const dayName = dayHeader.text;
    return `${dayName}요일`;
  };

  // 날짜 셀 내용 커스터마이즈
  const renderDayCellContent = (dayCellInfo) => {
    return dayCellInfo.date.getDate(); // 날짜만 반환
  };
  const handleSlotClickModalOpen = ({ start, end }) => {
    // 새 이벤트 폼 초기화
    //setNewEventForm(initData);
    // 모달 열기
    setModalOpen(true);
  };
  const handleModalClose = () => {
    // 수정 모드 해제
    setIsEditMode(false);
    // 모달 닫기
    setModalOpen(false);
    // 새 이벤트 폼 초기화
    //setNewEventForm(initData);
    // 업데이트 이벤트 초기화
    setUpdateEvent(null);
  };
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    // 새 이벤트 생성
    // createSchedule(newEventForm);
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === 'delete') {
      // 삭제 확인 모달 표시
      setOnConfirm(true);
    }
    else {
      // 이벤트 업데이트
    //  updateSchedule(updateEvent);
    }
  };

  const handleChange = (e) => {
    // if (isEditMode) {
    //   // 수정 모드에서는 updateEvent 업데이트
    //   setUpdateEvent({
    //     ...updateEvent,
    //     [e.target.name]: e.target.value,
    //   });
    // }
    // else {
    //   // 생성 모드에서는 newEventForm 업데이트
    //   setNewEventForm({
    //     ...newEventForm,
    //     [e.target.name]: e.target.value,
    //   });
    // }
  };

  const handleConfirmYes = () => {
    // deleteSchedule(sid);
    setOnConfirm(false);
    setModalOpen(false);
    setIsEditMode(false);
    setUpdateEvent(null);
  };
  const handleConfirmNo = () => {
    setOnConfirm(false);
  };
  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.classNames.length < 1) { //holiday
      setCurrentEvent(clickInfo.event);
      setModalOpen(true);
    }
  };
  const renderEventForm = () =>
    <form>
      <input
        type="text"
        name="title"
        value={currentEvent?.title || ''}
        onChange={handleChange}
        placeholder="Event Title"
      />
      <textarea
        name="description"
        value={currentEvent?.description || ''}
        onChange={handleChange}
        placeholder="Event Description"
      />
      <button type="button" onClick={() => isEditMode ? handleUpdateSubmit(currentEvent) : handleCreateSubmit(currentEvent)}>
        {isEditMode ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  ;

  return (
    <div><FullCalendar

      initialView="dayGridMonth"
      plugins={[dayGridPlugin]}
      locale="ko"
      headerToolbar={{
        left: '',
        center: 'prev title next',
        right: '',
      }}
      fixedWeekCount ={false}
      events={[...eventsData, ...holidayEvents]}
      eventContent={renderEventContent}
      height="auto"
      dayHeaderContent={renderDayHeaderContent} // 요일 셀 내용 커스터마이즈
      dayCellContent={renderDayCellContent} // 날짜 셀 내용 커스터마이즈
      dayMaxEventRows={4} // 한 셀에 표시될 최대 이벤트 수
      moreLinkText={moreLinkText}
      moreLinkClick="popover" // "더보기" 클릭 시 팝오버로 표시
      eventClick={handleEventClick} />

    <FullScreenDialog
      modalopen={modalOpen}
      handleSlotClickModalOpen={handleSlotClickModalOpen}
      handleModalClose={handleModalClose}
      content={currentEvent}
      handleCreateSubmit={handleCreateSubmit}
      handleUpdateSubmit={handleUpdateSubmit}
      handleChange={handleChange}
      isEditMode={isEditMode}
      onConfirm={onConfirm}
      handleConfirmYes={handleConfirmYes}
      handleConfirmNo={handleConfirmNo}
    /></div>
  );
};

export default WorkCalendar;
