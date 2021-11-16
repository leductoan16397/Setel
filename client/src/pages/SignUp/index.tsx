/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, SyntheticEvent, useContext, useState } from 'react';
import { Button, Card, CircularProgress } from '@mui/material';
import { DLink, Field, Toast, useInput } from 'utils';
import { AuthContext } from 'contexts/AuthContext';
import './index.scss';

export const Signup: FC = () => {
  const [loading, setLoading] = useState(false);
  const { doSignUp } = useContext(AuthContext);

  const { value: fullName, bind: bindFullName } = useInput('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');

  const handleSignUp = async (e: SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      Toast('Error!!', 'Password and Confirm Password should be same', 'danger');
      setLoading(false);
      return;
    }
    await doSignUp({ email, password, fullName });
    setLoading(false);
  };

  return (
    <Card style={{ width: 1200, margin: '100px auto', padding: '40px' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onSubmit={handleSignUp}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 800 }}> New Account Registration</h1>
        <Field label="Full Name" {...bindFullName} />
        <Field label="Email" {...bindEmail} type="email" />
        <Field label="Password" type="password" {...bindPassword} />
        <Field label="Confirm Password" type="password" {...bindConfirmPassword} />
        <Button variant="contained" color="primary" size="large" type="submit" disabled={loading}>
          {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
          Sign Up
        </Button>
        <DLink to="/signin">go to login &rarr;</DLink>
      </form>
    </Card>
  );
};
