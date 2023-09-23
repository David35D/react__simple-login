import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect runs during the first component evaluation and
  // in every component re-evaluation ONLY if dependecies change.
  useEffect(() => {
    // None of this code is to be ran directly in the component function, if we did we could end up creating an infinite loop.
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');  // Variable will be used to check if the user logged in.

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }

  }, []); // if we don't list anything on the dependecies, then this useEffect will only run ONCE.


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // Storing in local storage, first argument is an identifier.
    // second argument is the data we are storing, we are using it to indicate that we are logged in.
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn'); // Removing the logged in info from local storage
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <AuthContext.Provider 
        value={{
          isLoggedIn: isLoggedIn,
        }}
      >
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
