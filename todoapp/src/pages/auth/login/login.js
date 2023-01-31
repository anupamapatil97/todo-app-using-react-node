import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./login.css";
import { authLogin } from "../../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "./../../../services/validateData";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [fieldError, setFieldError] = useState({
    email: {
      validate: false,
      message: "",
    },
    password: {
      validate: false,
      message: "",
    },
  });

  const [showLoginError, setShowLoginError] = useState({
    show: false,
    message: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authLogin(formValues);

    if (response.status === 200) {
      navigate("/");
      setFormValues({
        email: "",
        password: "",
      });
    } else {
      setShowLoginError({
        message: response.message,
        show: true,
      });
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (e.target.name === "email") {
      const validateEmailData = validateEmail(e.target.value);
      setFieldError({
        ...fieldError,
        [e.target.name]: {
          validate: validateEmailData.validate,
          message: validateEmailData.message,
        },
      });
      return;
    }
    if (e.target.name === "password") {
      const validatePasswordData = validatePassword(e.target.value);
      setFieldError({
        ...fieldError,
        [e.target.name]: {
          validate: validatePasswordData.validate,
          message: validatePasswordData.message,
        },
      });
      return;
    }
  };

  const handleFocus = (e) => {
    if (fieldError[e.target.name].validate) {
      setFieldError({
        ...fieldError,
        [e.target.name]: {
          validate: false,
          message: "",
        },
      });
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <h4>Login here</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-field" controlId="formGroupEmail">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              {!fieldError.email.validate && (
                <div className="login-error-message">{fieldError.email.message}</div>
              )}
            </Form.Group>
            <Form.Group
              className="form-field"
              controlId="formGroupPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              {!fieldError.password.validate && (
                <div className="login-error-message">
                  {fieldError.password.message}
                </div>
              )}
            </Form.Group>
            <div className="login-btn-wrapper text-center">
              <Button
                className="px-3 mr-2"
                type="submit"
                disabled={!formValues.email || !formValues.password}
              >
                Login
              </Button>
              <Button className="px-3 ml-2" type="button" variant="secondary">
                Cancel
              </Button>
            </div>
          </Form>
          <p className="create-account">Create your account <Link to="/register">Register</Link></p>
          <div className="login-error">
            {showLoginError.show ? (
              <span className="text-danger">{showLoginError.message}</span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
