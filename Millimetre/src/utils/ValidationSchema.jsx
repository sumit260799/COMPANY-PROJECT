import * as Yup from "yup";

const existingEmails = ["existing@example.com", "taken@example.com"];

async function checkEmailUniqueness(email) {
  // Simulating a delayed response with setTimeout
  return new Promise((resolve) => {
    setTimeout(() => {
      const isUnique = !existingEmails.includes(email);
      resolve(isUnique);
    }, 1000); // Simulate a 1-second delay
  });
}

export const signUpSchema = Yup.object({
  shopName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name must not exceed 25 characters")
    .required("Please enter your shopname"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email")
    .test(
      "email-unique",
      "This email is already registered",
      async function (value) {
        if (!value) return false; // Skip if value is not provided
        const isEmailUnique = await checkEmailUniqueness(value);
        return isEmailUnique;
      }
    ),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number, and one symbol"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  agreedToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number, and one symbol"
    )
    .required("Password is required"),
});

export const BrandSignUpSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email")
    .test(
      "email-unique",
      "This email is already registered",
      async function (value) {
        if (!value) return false; // Skip if value is not provided
        const isEmailUnique = await checkEmailUniqueness(value);
        return isEmailUnique;
      }
    ),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number, and one symbol"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
export default signInSchema;
