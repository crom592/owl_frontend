import React from 'react';
import { Card, Button, Box, InputBase, Typography, IconButton } from '@mui/material';
import QRCode from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const QRCodeGenerator = ({ userId }) => {
  // 현재 시간 가져오기
  const currentTime = new Date().toISOString();

  // QR 코드에 인코딩할 데이터 생성
  const qrData = `UserID: ${userId}, Time: ${currentTime}`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(userId);
    alert('UserID가 복사되었습니다!');
  };

  return (
    <Card
      sx={{
        maxWidth: '95%',
        border: '1.74227px solid #EBEBEB',
        borderRadius: '17.4227px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ marginTop: '30px' }}>
        출퇴근 QR코드
      </Typography>
      <Typography variant="h7" color="" sx={{ marginBottom: '15px' }}>
        QR을 스캔해주세요
      </Typography>
      <QRCode
        bgColor="#F6F6F6"
        value={qrData}
        size={300}
        includeMargin={true}
        fgColor="#000000"
        style={{ borderRadius: '25px' }}
        imageSettings={{
          src: './assets/images/logo2.png', // 삽입할 이미지 경로
          x: undefined, // x와 y는 이미지를 QR 코드 중앙에 위치시키기 위해 undefined로 설정합니다.
          y: undefined,
          height: 50, // 이미지 높이
          width: 50, // 이미지 너비
          excavate: true, // QR 코드 픽셀을 제거하여 이미지를 뚫는 옵션
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingTop: '16px',
          gap: '8px', // 요소 간 간격
        }}
      >
        <InputBase
          value={`UserID: ${userId}`}
          readOnly
          sx={{
            marginTop: '16px',
            flexGrow: 1,
            padding: '8px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#F5F5F5',
            height: '48px', // 동일한 높이 설정
          }}
        />
        <IconButton
          onClick={handleCopyToClipboard}
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginTop: '16px',
            padding: '8px',
            backgroundColor: '#F5F5F5',
            height: '48px', // 동일한 높이 설정
            width: '48px', // 동일한 너비 설정
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: '100%',
          marginTop: '16px',
          marginBottom: '16px',
          height: '48px', // 동일한 높이 설정
          borderRadius: '8px',
        }}
      >
        확대해서 보기
      </Button>
    </Card>
  );
};

export default QRCodeGenerator;
