import { useState } from 'react';
import "./AuthPage.css"
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
    const [showAuthPage, setShowAuthPage] = useState(true)

    return (
        <main className="auth-page">
            
            <div className='auth-page-contents'>
                <h1 className='auth-page-title'>&nbsp;PlanIt&nbsp;</h1>
                <p className="slogan">lets keep it organized</p>
                {showAuthPage ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} />}
                {showAuthPage ? <p className="login-message">Already have an account?</p> : <p className="login-message">Don't have an account yet?</p>}
                <button className="login-option-btn" onClick={() => setShowAuthPage(!showAuthPage)}>
                    {showAuthPage ? 'Login' : 'Sign Up'}
                </button>
            </div>
        </main>
    );
}