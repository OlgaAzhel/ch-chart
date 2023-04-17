import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LogInForm from '../../components/LogInForm/LogInForm';
import { useState } from 'react';

export default function AuthPage({ setUser }) {
  const [view, setView] = useState('SIGN UP')
  function handleClick() {
    if (view === 'SIGN UP') {
      setView('LOG IN')
    } else {
      setView('SIGN UP')
    }
  }
  return (

    <section className='auth'>

      {(view === 'LOG IN') ? <p class="text-center">Have an account?</p> : <p class="text-center">Don't have account?</p>
        }
      <button onClick={handleClick} className="btn btn-secondary btn-sm w-25 mx-auto">{view}</button>

      {(view === 'LOG IN') ? <SignUpForm setUser={setUser} />
        :
        <LogInForm setUser={setUser} />

      }
      <section className='Comments'>

      </section>
    </section>

  );
}