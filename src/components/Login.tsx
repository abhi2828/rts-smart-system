import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const signInHandler = async () => {
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (!result?.error) {
        window.location.href = '/home';
      } else {
        setError('Invalid Login details');
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <section className=''>
      <div className='tw-relative tw-min-h-[25rem] tw-bg-[#211061]'>
        <div className='tw-absolute tw-left-[50%] tw-top-[40%] tw-h-[35rem] tw-max-w-[25rem] -tw-translate-x-2/4 tw-rounded-xl tw-bg-white'>
          <div>
            <img
              className='tw-block  tw-h-[10rem] tw-max-w-[25rem] tw-rounded-xl'
              src='/assets/images/photo_2023-08-14_21-58-16.jpg'
              alt='rts-logo'
            />
            <div className='tw-p-[2rem]'>
              <div className='tw-mt-2'>Enter your details</div>
              <TextField
                className='!tw-mt-5 tw-block !tw-py-3'
                variant='standard'
                placeholder='Username'
                fullWidth
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                className='!tw-mt-5 tw-block !tw-py-3'
                name='password'
                variant='standard'
                placeholder='Password'
                fullWidth
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                {...(error !== null && { helperText: error, error: true })}
              />
              <Button
                className='!tw-mt-3 !tw-rounded-xl !tw-p-3'
                variant='contained'
                fullWidth
                onClick={() => {
                  signInHandler();
                }}
              >
                Log in{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='tw-flex tw-min-h-[35] tw-items-end tw-justify-center tw-bg-[#F6F8FC]'>
        <div className='tw-mb-5 tw-flex tw-min-w-[50rem] tw-flex-col tw-items-center tw-justify-center tw-pt-[25rem]'>
          <div>
            RAPID TRANSIT SYSTEM LINK (RTS LINK) PROJECT BETWEEN JOHOR BAHRU AND
            SINGAPORE{' '}
          </div>
          <div> About RTS Link </div>
          <div className='tw-text-center'>
            {' '}
            MRT Corp has set up a subsidiary, Malaysia Rapid Transit System Sdn
            Bhd (MRTS), to be the developer and owner of the civil
            infrastructure for the Malaysian section of the Rapid Transit System
            Link (RTS Link) Project Between Johor Bahru and Singapore. The
            company was incorporated on 5 December 2019. Learn More
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
