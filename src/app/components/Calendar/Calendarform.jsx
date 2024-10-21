import { Button, FormLabel, Grid, Icon, Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useEffect, useRef } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import styled from 'styled-components';

import ConfirmationDialog from '../ConfirmationDialog';
import { Span } from '../Typography';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));
const B7 = styled.b`
  width: 82.7px;
  position: relative;
  text-decoration: underline;
  line-height: 25.2px;
  display: inline-block;
  flex-shrink: 0;
  white-space: nowrap;
`;
function Calendarform ({
  content,
  handleCreateSubmit,
  handleUpdateSubmit,
  handleChange,
  isEditMode,
  onConfirm,
  handleConfirmYes,
  handleConfirmNo,
  handleStartChange,
  handleEndChange,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //console.log(state);

  return (
    <div>
      {console.log(content)}
      <ValidatorForm onSubmit={isEditMode ? handleUpdateSubmit : handleCreateSubmit} onError={() => null}>
        <Grid container spacing={10} justifyContent="center">
          <Grid item lg={10} md={10} sm={10} xs={10} sx={{ mt: 0 }}>
            <FormLabel id="title" sx={{
              textDecoration: 'underline',
              color: '#0063f7',
            }}>
                구인글 제목
            </FormLabel>

            <TextField
              type="text"
              name="name"
              id="name"
              value={content.name || ''}
              //onChange={handleChange}
              validators={['required']}
              inputRef={inputRef}
              InputProps={{ readOnly: true }}
              variant="filled"
            />
            <FormLabel id="team">이름</FormLabel>
            <TextField
              type="text"
              name="team"
              id="team"
              value={content.team || ''}
              //   onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required']}
              InputProps={{ readOnly: true }}
              variant="filled"
            />
            <FormLabel id="userFullName">사용자</FormLabel>
            <TextField
              type="text"
              name="userFullName"
              id="userFullName"
              value={content.fullName || ''}
              //   onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required']}
              InputProps={{ readOnly: true }}
              variant="filled"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack
                style={{ marginBottom: '16px' }}
                direction="row"
                spacing={1}
                justifyContent="space-between"
                variant="filled"
              >
                <DatePicker
                  value={content.start}
                  label="시작일"
                  renderInput={(props) => <TextField {...props} id="mui-pickers-date" />}
                />

                <DatePicker
                  value={content.end}
                  label="종료일"
                  renderInput={(props) => <TextField {...props} id="mui-pickers-date" />}
                />
              </Stack>
            </LocalizationProvider>

            <TextField name="purpose" id="purpose" multiline rows={4} value={content.purpose || ''} onChange={handleChange} />
            {isEditMode
              ? <div>
                <Stack style={{ marginBottom: '16px' }} direction="row" spacing={1} justifyContent="space-between">
                  <Button id="update" color="warning" variant="contained" type="submit" disabled={!content.auth}>
                    <Icon>edit</Icon>
                    <Span sx={{
                      pl: 1,
                      textTransform: 'capitalize',
                    }}>Modify</Span>
                  </Button>

                  <Button id="delete" color="error" variant="contained" type="submit" disabled={!content.auth}>
                    <Icon>delete</Icon>
                    <Span sx={{
                      pl: 1,
                      textTransform: 'capitalize',
                    }}>Delete</Span>
                  </Button>
                </Stack>
              </div>
              : <div>
                <Button color="primary" variant="contained" type="submit">
                  <Icon>save</Icon>
                  <Span sx={{
                    pl: 1,
                    textTransform: 'capitalize',
                  }}>Save</Span>
                </Button>
              </div>
            }
          </Grid>
        </Grid>
      </ValidatorForm>
      <ConfirmationDialog
        open={onConfirm}
        onConfirmDialogClose={handleConfirmNo}
        title="Confirm"
        onYesClick={handleConfirmYes}
        onNoClick={handleConfirmNo}
        text="정말 삭제하시겠습니까 ?"
      ></ConfirmationDialog>
    </div>
  );
}

export default Calendarform;
