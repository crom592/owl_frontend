import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField, Typography, Divider } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Paragraph, Tiny } from '../../components/Typography';
import useAuth from '../../hooks/useAuth';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
  flexDirection: 'column',
}));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  position: 'relative',
  padding: '0px',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#F7F5F5',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  '& .card': {
    maxWidth: 500,
    minHeight: 575,
    margin: '1rem',
    padding: '0px 40px 40px 40px',
    display: 'flex',
    borderRadius: 55,
    alignItems: 'center',
    boxShadow: 'none', // Remove shadow for a clean look
  },
}));

const initialValues = {
  email: '',
  password: '',
};

// Form validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('유효한 이메일형식이 아닙니다. 올바른 이메일 형식으로 작성해주세요.')
    .required('이메일 아이디를 입력해주세요.'),
  password: Yup.string()
    .min(4, '비밀번호는 최소 4자 이상이어야 합니다.')
    .required('비밀번호를 입력해주세요.'),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errmsg, setErrmsg] = useState('');

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      setErrmsg('');
      await login(values.email, values.password);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrmsg(error.response.data.message);
      } else {
        setErrmsg('서버와의 통신 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <JWTRoot>
      <JustifyBox p={2} height="100%" sx={{ minWidth: 200 }}>
        <img src="./assets/images/login_owl.png" alt="" width="140px" />
      </JustifyBox>
      <Card className="card">
        <Grid container>
          <Grid item sm={12} xs={12}>
            <JustifyBox p={5} height="100%" sx={{ minWidth: 200 }}>
              <Typography variant="h4" fontWeight="bold">
                로그인
              </Typography>
            </JustifyBox>
          </Grid>
          <Grid item sm={12} xs={12}>
            <ContentBox>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnMount // Validate the form when it's mounted
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                  dirty,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="email"
                      label="이메일 아이디" // Label is fixed above the field
                      placeholder="example@gmail.com" // Placeholder stays inside the input field
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          color: 'black', // Set the label color to black
                        },
                      }}
                      sx={{
                        mb: 5,
                        '& .MuiFormHelperText-root': {
                          margin: '1px',
                          fontSize: '12px',
                          position: 'absolute',
                          top: '100%',
                          color: 'red',
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      placeholder="비밀번호를 입력해주세요"
                      label="비밀번호"
                      size="small"
                      name="password"
                      type="password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          color: 'black',
                        },
                      }}
                      sx={{
                        mb: 5,
                        '& .MuiFormHelperText-root': {
                          margin: '1px',
                          fontSize: '12px',
                          position: 'absolute',
                          top: '100%',
                          color: 'red',
                        },
                      }}
                    />
                    <Divider sx={{ width: '100%', mb: 1 }} />{' '}
                    <Paragraph
                      color="red"
                      sx={{
                        height: '5px', // Fixed height to prevent resizing
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        mb: 1,
                      }}
                    >
                      {errmsg}
                    </Paragraph>
                    <LoadingButton
                      size="large"
                      type="submit"
                      color="primary"
                      loading={loading}
                      disabled={!isValid || !dirty} // Disable button if form is invalid or not dirty
                      variant="contained"
                      sx={{
                        fontWeight: 'bold',
                        mt: 2,
                        width: '100%',
                      }}
                    >
                      Login
                    </LoadingButton>
                    <LoadingButton
                      size="large"
                      type="button"
                      color="secondary"
                      variant="outlined"
                      sx={{
                        width: '100%',
                        fontWeight: 'bold',
                        borderColor: '#DDDDDD',
                        mt: 1,
                        mb: 1,
                      }}
                      onClick={() => navigate('/session/signup')}
                    >
                      회원가입
                    </LoadingButton>
                    <Typography
                      fontSize={11}
                      variant="caption"
                      color="textSecondary"
                      align="center"
                      sx={{ mt: 5, padding: '10px' }}
                    >
                      사장님 계정이 없으신가요? 회원가입을 통해 사장님 계정을 생성해주세요.
                    </Typography>
                    <Tiny display="block" textAlign="center" sx={{ mt: 5 }}>
                      COPYRIGHT © OWL ALL RIGHTS RESERVED.
                    </Tiny>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
