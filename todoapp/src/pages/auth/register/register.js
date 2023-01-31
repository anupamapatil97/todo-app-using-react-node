import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./register.css";
import { register } from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateData,
} from "./../../../services/validateData";

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [fieldError, setFieldError] = useState({
    name: {
      validate: false,
      message: "",
    },
    email: {
      validate: false,
      message: "",
    },
    password: {
      validate: false,
      message: "",
    },
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await register(formValues);
    if (response.status === 200) {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (e) => {
    if (e.target.name === "name") {
      const validate = validateData(e.target.value);
      setFieldError({
        ...fieldError,
        [e.target.name]: {
          validate: validate.validate,
          message: `Name is ${validate.message}`,
        },
      });
      return;
    } else if (e.target.name === "email") {
      const validateEmailData = validateEmail(e.target.value);
      setFieldError({
        ...fieldError,
        [e.target.name]: {
          validate: validateEmailData.validate,
          message: validateEmailData.message,
        },
      });
      return;
    } else if (e.target.name === "password") {
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

  const handleCancel = () => {
    setFieldError({
      name: {
        validate: false,
        message: "",
      },
      email: {
        validate: false,
        message: "",
      },
      password: {
        validate: false,
        message: "",
      },
    });
    setFormValues({ name: "", email: "", password: "" });
  };

  return (
    <>
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <h4>Create Your Account</h4>

          <Form onSubmit={handleRegister}>
            <Form.Group className="form-field" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              {!fieldError.name.validate && (
                <div className="error-message">{fieldError.name.message}</div>
              )}
            </Form.Group>
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
                <div className="error-message">{fieldError.email.message}</div>
              )}
            </Form.Group>
            <Form.Group className="form-field" controlId="formGroupEmail">
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
                <div className="error-message">
                  {fieldError.password.message}
                </div>
              )}
            </Form.Group>
            <div className="register-btn-wrapper">
              <Button
                className="px-3"
                type="submit"
                disabled={
                  !formValues.email || !formValues.password || !formValues.name
                }
              >
                Register
              </Button>
              <Button
                onClick={handleCancel}
                className="px-3"
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </Form>
          <p className="already-account">
            Already have account <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
