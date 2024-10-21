import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField, Typography, Box, Checkbox, Divider } from '@mui/material';
import { Paragraph } from '../../components/Typography';
import { styled } from '@mui/system';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';

// Styled components
const HeaderBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '10px',
  marginTop: '7px', // 헤더와 카드 사이 간격 조정
}));

const SectionBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const FormWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  margin: '0px',
  padding: '0px',
}));

const LabelBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  backgroundColor: '#F8F8F8',
  padding: '0px 15px 0px 15px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#333',
  height: '100%',
  fontSize: '13px',
  borderLeft: '1px solid #ddd',
  borderRight: '1px solid #ddd',
  borderBottom: '1px solid #ddd',
}));

const InputGridItem = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderLeft: '1px solid #ddd', // 왼쪽 보더만 추가
  borderBottom: '1px solid #ddd', // 아래쪽 보더 추가
}));

const GridContainer = styled(Grid)(() => ({
  borderTop: '1.5px solid #c3c0bc',
}));

const AgreementBox = styled(Box)(() => ({
  backgroundColor: '#F8F8F8',
  padding: '10px',
  borderTop: '1.5px solid #c3c0bc',
}));

const WhiteBox = styled(Box)(() => ({
  backgroundColor: '#fff',
  padding: '0px 0px 0px 0px',
  borderRadius: '5px',
  marginBottom: '3px',
  border: '1px solid #ddd', // 구역 나눔
}));
const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  phone: '',
  businessNumber: '',
  businessName: '',
  representative: '',
  businessAddress: '',
  terms: false,
  agreeAll: false,
  agreeService: false,
  agreePersonalInfo: false,
  agreeAd: false,
  agreeAd2: false,
};
// Reusable TextField Component
const CustomTextField = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onBlur,
  onChange,
  error,
  touched,
}) => (
  <>
    <Grid item xs={3}>
      <LabelBox>
        {label}
        <Typography component="span" color="primary" sx={{ marginLeft: '5px' }}>
          *
        </Typography>
      </LabelBox>
    </Grid>
    <InputGridItem item xs={9} container>
      <Grid item xs={6} display="flex" alignItems="center">
        <TextField
          name={name}
          placeholder={placeholder}
          type={type}
          variant="outlined"
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          error={touched && Boolean(error)}
          size="small"
          sx={{
            width: '100%',
            flexGrow: 1,
            marginLeft: '5px',
            '& .MuiOutlinedInput-root': {
              padding: '0px', // 내부 패딩 제거
              height: '35px', // 원하는 높이 설정
            },
            '& .MuiInputBase-input': {
              padding: '8px', // 텍스트 입력 부분의 패딩 조정
            },
          }}
          inputProps={{
            style: { fontSize: '12px' }, // placeholder 폰트 크기 조절
          }}
        />
      </Grid>
      <Grid item xs={6} display="flex" alignItems="center" justifyContent="flex-end">
        <Typography variant="body2" color="error" sx={{ marginLeft: '10px' }}>
          {touched && error}
        </Typography>
      </Grid>
    </InputGridItem>
  </>
);

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('유효한 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .required('비밀번호를 입력해주세요.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.'),
  username: Yup.string().required('이름을 입력해주세요.'),
  phone: Yup.string().required('전화번호를 입력해주세요.'),
  businessNumber: Yup.string().required('사업자 등록번호를 입력해주세요.'),
  businessName: Yup.string().required('기업/점포명을 입력해주세요.'),
  representative: Yup.string().required('대표자명을 입력해주세요.'),
  businessAddress: Yup.string().required('기업/점포 주소를 입력해주세요.'),
});

const handleAgreeAllChange = (setFieldValue, agreeAll) => {
  setFieldValue('agreeAll', agreeAll);
  setFieldValue('agreeService', agreeAll);
  setFieldValue('agreePersonalInfo', agreeAll);
  setFieldValue('agreeAd', agreeAll);
  setFieldValue('agreeAd2', agreeAll);
};

const JwtRegister = () => {
  const [loading, setLoading] = useState(false);
  const [errmsg, setErrmsg] = useState('');
  const { register } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      setErrmsg('');
      await register(values.email, values.password);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        setErrmsg(error.response.data.message);
      } else {
        setErrmsg('서버와의 통신 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <HeaderBox>
        <img src="./assets/images/login_owl.png" alt="" width="140px" />
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ marginTop: '15px', fontSize: '14px' }}
        >
          회원가입을 통해 OWL 가족이 되어보세요.
        </Typography>
      </HeaderBox>

      <FormWrapper>
        <Card
          sx={{
            maxWidth: '950px',
            padding: '30px 50px 30px 50px',
            borderRadius: '17px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            mb: 3,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            validateOnChange={false} // onChange 시 즉시 검증하지 않음
            validateOnBlur={true} // onBlur 시에만 검증
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                {/* 가입정보 Section */}
                <SectionBox>
                  <Typography fontWeight="bold" gutterBottom sx={{ fontSize: '16px' }}>
                    가입정보
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="right"
                    sx={{ fontSize: '12px', marginRight: '15px' }}
                  >
                    <Typography
                      component="span"
                      color="primary"
                      sx={{ verticalAlign: 'middle', marginRight: '5px' }}
                    >
                      *
                    </Typography>
                    표시는 반드시 입력하셔야 합니다.
                  </Typography>
                </SectionBox>

                <GridContainer container>
                  {/* Custom Fields */}
                  <Grid item xs={3}>
                    <LabelBox>
                      이메일
                      <Typography component="span" color="primary" sx={{ marginLeft: '5px' }}>
                        *
                      </Typography>
                    </LabelBox>
                  </Grid>
                  <InputGridItem item xs={9} container>
                    <Grid item xs={6} display="flex" alignItems="center">
                      <TextField
                        name="email"
                        placeholder="예: example@gmail.com"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        size="small"
                        sx={{
                          flexGrow: 1,
                          marginLeft: '5px',
                          marginRight: '10px', // 버튼과의 간격 조정
                          '& .MuiOutlinedInput-root': {
                            padding: '0px', // 내부 패딩 제거
                            height: '35px', // 원하는 높이 설정
                          },
                          '& .MuiInputBase-input': {
                            padding: '8px', // 텍스트 입력 부분의 패딩 조정
                          },
                        }}
                        inputProps={{
                          style: { fontSize: '12px' }, // placeholder 폰트 크기 조절
                        }}
                      />
                      <LoadingButton
                        type="button"
                        color="primary"
                        variant="contained"
                        disabled={true}
                        sx={{
                          height: '35px', // 버튼 높이를 입력 필드와 일치시킴
                          whiteSpace: 'nowrap',
                        }}
                      >
                        인증하기
                      </LoadingButton>
                    </Grid>

                    <Grid
                      sx={{ ml: 0 }}
                      item
                      xs={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Typography variant="body2" color="error" sx={{ marginLeft: '10px' }}>
                        {touched.email && errors.email}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} alignItems="center" display="flex" sx={{ marginTop: '10px' }}>
                      <TextField
                        name="auth"
                        placeholder="인증코드 6자리를 입력해주세요"
                        disabled={true}
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.auth}
                        onChange={handleChange}
                        error={touched.auth && Boolean(errors.auth)}
                        size="small"
                        sx={{
                          width: '100%',
                          flexGrow: 1,
                          marginLeft: '5px',
                          '& .MuiOutlinedInput-root': {
                            padding: '0px', // 내부 패딩 제거
                            height: '35px', // 원하는 높이 설정
                          },
                          '& .MuiInputBase-input': {
                            padding: '8px', // 텍스트 입력 부분의 패딩 조정
                          },
                        }}
                        inputProps={{
                          style: { fontSize: '12px' }, // placeholder 폰트 크기 조절
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} display="flex" alignItems="center" justifyContent="flex-end">
                      <Typography variant="body2" color="error" sx={{ marginLeft: '10px' }}>
                        {touched.auth && errors.auth}
                      </Typography>
                    </Grid>
                  </InputGridItem>
                  <CustomTextField
                    name="password"
                    label="비밀번호"
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <CustomTextField
                    name="confirmPassword"
                    label="비밀번호 확인"
                    type="password"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                  <CustomTextField
                    name="username"
                    label="이름"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.username}
                    touched={touched.username}
                  />
                  <CustomTextField
                    name="phone"
                    label="휴대폰 번호"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.phone}
                    touched={touched.phone}
                  />
                </GridContainer>

                {/* 사업자 등록 Section */}
                <SectionBox>
                  <Typography fontWeight="bold" gutterBottom sx={{ mt: 2, fontSize: '16px' }}>
                    사업자 등록
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="right"
                    sx={{ fontSize: '12px', marginRight: '15px' }}
                  >
                    <Typography
                      component="span"
                      color="primary"
                      sx={{ verticalAlign: 'middle', marginRight: '5px' }}
                    >
                      *
                    </Typography>
                    표시는 반드시 입력하셔야 합니다.
                  </Typography>
                </SectionBox>

                <GridContainer container>
                  {/* 사업자등록번호 */}
                  <Grid item xs={3}>
                    <LabelBox>
                      사업자등록번호
                      <Typography component="span" color="primary" sx={{ marginLeft: '5px' }}>
                        *
                      </Typography>
                    </LabelBox>
                  </Grid>
                  <InputGridItem item xs={9} container>
                    <Grid item xs={6} display="flex" alignItems="center">
                      <TextField
                        name="businessNumber"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.businessNumber}
                        onChange={handleChange}
                        error={touched.businessNumber && Boolean(errors.businessNumber)}
                        size="small"
                        sx={{
                          flexGrow: 1,
                          marginLeft: '5px',
                          marginRight: '10px', // 버튼과의 간격 조정
                          '& .MuiOutlinedInput-root': {
                            padding: '0px', // 내부 패딩 제거
                            height: '35px', // 원하는 높이 설정
                          },
                          '& .MuiInputBase-input': {
                            padding: '8px', // 텍스트 입력 부분의 패딩 조정
                          },
                        }}
                        inputProps={{
                          style: { fontSize: '12px' }, // placeholder 폰트 크기 조절
                        }}
                      />
                      <LoadingButton
                        type="button"
                        color="primary"
                        variant="contained"
                        disabled={true}
                        sx={{
                          height: '35px', // 버튼 높이를 입력 필드와 일치시킴
                          whiteSpace: 'nowrap',
                        }}
                      >
                        인증하기
                      </LoadingButton>
                    </Grid>
                    <Grid
                      sx={{ ml: 0 }}
                      item
                      xs={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Typography variant="body2" color="error" sx={{ marginLeft: '10px' }}>
                        {touched.businessNumber && errors.businessNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '10px', marginLeft: '5px' }}>
                      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '10px' }}>
                        • 사업자등록번호 도용 방지를 위해 기업인증을 시행하고 있습니다.
                        <br />
                        • 인증이 되지 않을 경우 고객센터(email@email.com)로 문의해 주세요.
                        <br />• 가입 후, 사업자등록번호/회사명을 변경하시려면 고객센터로
                        사업자등록증을 보내주셔야 합니다.
                      </Typography>
                    </Grid>
                  </InputGridItem>

                  <CustomTextField
                    name="businessName"
                    label="기업/점포명"
                    value={values.businessName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.businessName}
                    touched={touched.businessName}
                  />
                  <CustomTextField
                    name="representative"
                    label="대표자명"
                    value={values.representative}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.representative}
                    touched={touched.representative}
                  />
                  <CustomTextField
                    name="businessAddress"
                    label="기업/점포 주소"
                    value={values.businessAddress}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.businessAddress}
                    touched={touched.businessAddress}
                  />
                </GridContainer>

                {/* 약관동의 Section */}
                <SectionBox>
                  <Typography fontWeight="bold" gutterBottom sx={{ mt: 2, fontSize: '16px' }}>
                    약관동의
                    <Typography component="span" color="primary" sx={{ marginLeft: '5px' }}>
                      *
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="right"
                    sx={{ fontSize: '12px', marginRight: '15px' }}
                  >
                    <Typography
                      component="span"
                      color="primary"
                      sx={{ verticalAlign: 'middle', marginRight: '5px' }}
                    >
                      *
                    </Typography>
                    표시는 반드시 입력하셔야 합니다.
                  </Typography>
                </SectionBox>

                <AgreementBox sx={{ textAlign: 'left', padding: '10px 80px' }}>
                  {/* 전체동의 */}
                  <Grid container alignItems="center">
                    <Checkbox
                      checked={values.agreeAll}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleAgreeAllChange(setFieldValue, isChecked);
                      }}
                      name="agreeAll"
                    />
                    <Typography fontWeight="bold" variant="body2" sx={{ display: 'inline-block' }}>
                      전체동의
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary"
                      sx={{ ml: '5px', fontSize: '10px', display: 'inline-block' }}
                    >
                      선택항목 포함 모든 약관에 동의합니다.
                    </Typography>
                  </Grid>

                  {/* 서비스 이용약관동의 */}
                  <WhiteBox>
                    <Grid container alignItems="center">
                      <Checkbox
                        checked={values.agreeService}
                        onChange={handleChange}
                        name="agreeService"
                      />
                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        color="primary"
                        sx={{ marginRight: '4px' }}
                      >
                        [필수]
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        sx={{ display: 'inline-block' }}
                      >
                        서비스 이용약관동의
                      </Typography>
                    </Grid>
                  </WhiteBox>

                  {/* 개인정보 수집 및 이용 동의 */}
                  <WhiteBox>
                    <Grid container alignItems="center">
                      <Checkbox
                        checked={values.agreePersonalInfo}
                        onChange={handleChange}
                        name="agreePersonalInfo"
                      />
                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        color="primary"
                        sx={{ marginRight: '4px' }}
                      >
                        [필수]
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        sx={{ display: 'inline-block' }}
                      >
                        개인정보 수집 및 이용 동의
                      </Typography>
                    </Grid>
                  </WhiteBox>

                  {/* 광고성 정보 수신 동의 */}
                  <WhiteBox>
                    <Grid container alignItems="center">
                      <Checkbox checked={values.agreeAd} onChange={handleChange} name="agreeAd" />
                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        sx={{ display: 'inline-block' }}
                      >
                        [선택] 광고성 정보 수신 동의
                      </Typography>
                    </Grid>
                  </WhiteBox>
                  <WhiteBox>
                    <Grid container alignItems="center">
                      <Checkbox checked={values.agreeAd2} onChange={handleChange} name="agreeAd2" />

                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        sx={{ display: 'inline-block' }}
                      >
                        [선택] 개인정보 수집 빛 이용 동의 - 인재추천 * 혜택
                      </Typography>
                    </Grid>
                  </WhiteBox>
                  <Typography
                    variant="body2"
                    color="secondary"
                    sx={{
                      ml: '43px',
                      fontSize: '10px',
                      display: 'inline-block',
                      verticalAlign: 'top',
                    }}
                  >
                    *인재 추천 및 다양한 혜택 알림을 받으려면 동의가 필요해요
                  </Typography>
                </AgreementBox>

                {/* Submit Button */}
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ width: '75%', fontWeight: 'bold', mt: 4, fontSize: '14px' }}
                  >
                    회원가입
                  </LoadingButton>
                </Box>
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
              </form>
            )}
          </Formik>
        </Card>
      </FormWrapper>
    </>
  );
};

export default JwtRegister;
