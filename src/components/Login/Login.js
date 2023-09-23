 import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// We create the reducer function outside of the component.
// This is because we won't need any data that's generated inside the component.
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@')};
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@')};
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6};
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6};
  }

  
  return { value: '', isValid: false};
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });

/*   // Using dependencies
  // The simple rule is to add whatever we use inside the useEffect
  // in this case the enteredEmail, Password and the setFormIsValid function.
  useEffect(() => {
    // Setting a timer for every keystroke with a delay of 500ms
    const timeOutIdentifier = setTimeout((() => {
      console.log('Checking form validity...');
      setFormIsValid(
        emailState.isValid && enteredPassword.trim().length > 6
      );
    }), 500);

    // We need to clear the timers every time the user hits a key, so that we have only one timer running
    return () => {
      console.log('Cleanup');
      clearTimeout(timeOutIdentifier);
    }; // Cleanup function, runs before every new side effect and before the component is removed from the dom. It does not run before the first side effect execution.
  }, [emailState.isValid, enteredPassword]); // However we don't list setFormIsValid because React gurantees that state updating functions never change. */

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', value: event.target.value}); // We set the action to be an object.

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', value: event.target.value});

    setFormIsValid(
      emailState.isValid && event.target.value.trim() > 6
    );
  };

  const validateEmailHandler = () => {
    // We don't include the value payload on our action because we only
    // care if the input lost focus.
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
