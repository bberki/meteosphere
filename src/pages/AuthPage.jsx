// src/components/AuthPage.jsx
import React, { useState } from 'react';
import './AuthPage.css';
import { registerUser, loginUser } from '../services/authAPI';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setEmail('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const result = await loginUser({ identifier: email, password });

        localStorage.setItem('token', result.token);
        console.log(" Backend login sonucu:", result);
        console.log(" Gelen user objesi:", result.user);
        console.log(" Gelen user._id:", result.user._id);
        const userWithId = {
          ...result.user,
          id: result.user._id,
          favoriteLocations: result.user.favoriteLocations || []
        };

        console.log("App'e gönderilecek user:", userWithId);

        if (typeof onAuthSuccess === 'function') {

          onAuthSuccess(userWithId);
        } else {
          console.warn('onAuthSuccess fonksiyonu tanımlı değil.');
        }

      } else {
        await registerUser({ email, username, password });
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        setIsLogin(true);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Bir hata oluştu.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="logo-title">Meteosphere</h1>
        <h2>{isLogin ? 'Log In' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-text">{errorMessage}</p>}
          <button type="submit">{isLogin ? 'Log In' : 'Register'}</button>
        </form>
        <p className="toggle-text">
          {isLogin ? 'Hesabınız yok mu? ' : 'Zaten hesabınız var mı? '}
          <span className="toggle-link" onClick={toggleMode}>
            {isLogin ? 'Log In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;