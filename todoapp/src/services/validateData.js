export const validateEmail = (value) => {
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (value === "") {
    return { validate: false, message: "Email Id is required" };
  } else if (!regexp.test(value)) {
    return { validate: false, message: "Email Id is invalid" };
  } else {
    return { validate: true, message: "" };
  }
};

export const validatePassword = (value) => {
  if (value === "") {
    return { validate: false, message: "Password is required" };
  }
};

export const validateData = (value) => {
  if (value === "") {
    return { validate: false, message: " is required" };
  }
};
