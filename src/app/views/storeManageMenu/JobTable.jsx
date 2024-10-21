import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Pagination,
  Typography,
  Button,
} from '@mui/material';

import Tags from './Tags';
import PersonTag from './PersonTag';
// 태그의 색상을 결정하는 함수

function getTagColor(tag) {
  switch (tag) {
    case '근무완료':
      return 'orange';
    case '채용완료':
      return 'blue';
    case '채용중':
      return 'gray';
    default:
      return 'gray';
  }
}
function getPersonColor(tag) {
  switch (tag) {
    case '근무완료':
      return 'blue';
    case '채용완료':
      return 'orange';
    case '채용중':
      return 'gray';
    default:
      return 'gray';
  }
}
function JobTable({ jobs }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5; // 페이지 당 행 수

  // 페이지 변경 핸들러
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 현재 페이지에 표시할 행 계산
  const currentRows = jobs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ marginTop: '15px' }}>
      {currentRows.length > 0 ? (
        <>
          <TableContainer>
            <Table stickyHeader sx={{ border: 'none' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: '15%',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#888',
                      backgroundColor: 'transparent',
                    }}
                  >
                    구인 일시
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '55%',
                      textAlign: 'left',
                      fontSize: '12px',
                      color: '#888',
                      backgroundColor: 'transparent',
                    }}
                  >
                    구인글 제목
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '15%',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#888',
                      backgroundColor: 'transparent',
                    }}
                  >
                    인원
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '15%',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#888',
                      backgroundColor: 'transparent',
                    }}
                  >
                    태그
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((job, index) => (
                  <TableRow key={index} hover>
                    <TableCell
                      sx={{
                        paddingRight: '50px',
                        textAlign: 'right',
                        fontSize: '14px',
                      }}
                    >
                      {job.time}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textAlign: 'left',
                      }}
                      title={job.title}
                    >
                      {job.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'right',
                        fontSize: '14px',
                      }}
                    >
                      <PersonTag text={job.people} color={getPersonColor(job.tag)} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '14px',
                      }}
                    >
                      <Tags text={job.tag} color={getTagColor(job.tag)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '16px',
              marginTop: '5px',
            }}
          >
            <Pagination
              count={Math.ceil(jobs.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 0',
          }}
        >
          <img
            src="./assets/images/icon/owl_gray.png"
            alt="Owl Icon"
            style={{ width: 150, height: 150 }}
          />

          {/* 이미지로 아이콘 표시 */}
          <Typography variant="body2" sx={{ marginTop: '16px', color: '#888' }}>
            구인글이 없어요
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', marginBottom: '24px' }}>
            구인글을 생성하세요.
          </Typography>
          <Button variant="contained" color="primary">
            구인글 생성하러 가기
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default JobTable;
