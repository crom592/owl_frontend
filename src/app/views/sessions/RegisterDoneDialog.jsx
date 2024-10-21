import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RegisterModal({ modalhandler, showModal }) {
  return (
    <Box>
      <Dialog
        open={showModal}
        onClose={(event, reason) => modalhandler(event, reason)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">회원가입 완료</DialogTitle>

        <DialogContent>
          <Typography color="text.secondary" variant="body1">
            회원가입이 정상적으로 완료되었습니다.
          </Typography>
          <Typography
            sx={{
              color: '#f65d10',
              mt: 2,
              fontSize: '0.7rem',
            }}
            variant="body2"
          >
            관리자의 최종 승인 후 로그인이 가능합니다. 관리자에게 문의하세요.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={modalhandler} color="primary" autoFocus>
            로그인 페이지로 이동
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
