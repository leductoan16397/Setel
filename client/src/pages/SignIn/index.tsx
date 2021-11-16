/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, SyntheticEvent, useContext, useState } from 'react';
import { DLink, Field, useInput } from 'utils';
import { Button, Card, CircularProgress } from '@mui/material';
import { AuthContext } from 'contexts/AuthContext';
import './index.scss';

export const SignIn: FC = () => {
  const [loading, setLoading] = useState(false);
  const { doSignIn } = useContext(AuthContext);

  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const handleSubmit = async (e: SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    await doSignIn(email, password);
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
        onSubmit={handleSubmit}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 800 }}> Sign in to an existing account</h1>
        <Field label="Email" {...bindEmail} type="email" />
        <Field label="Password" type="password" {...bindPassword} />
        <Button variant="contained" color="primary" size="large" type="submit" disabled={loading}>
          {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
          Login to Your Account
        </Button>
        <DLink to="/signup">Create a new account &rarr;</DLink>
      </form>
    </Card>
  );
};
