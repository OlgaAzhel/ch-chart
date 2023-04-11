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
    
    <main>
      <button onClick={handleClick}>{view}</button>
      <h1>AuthPage</h1>
      { (view === 'LOG IN')? <SignUpForm setUser={ setUser }/>
      :
      <LogInForm setUser={ setUser }/>

      }
      <section className='Comments'>
      
      </section>
    </main>
    
  );
}