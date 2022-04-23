const yup = require('yup');

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Missing username')
    .min(4, 'username should have at least 4 characters'),

  password: yup
    .string()
    .required('Missing password')
    .min(6, 'password should have at least 6 characters'),
});

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Missing username')
    .min(4, 'username should have at least 4 characters'),

  password: yup
    .string()
    .required('Missing password')
    .min(6, 'password should have at least 6 characters'),

  firstName: yup.string().required('Missing first name'),
  lastName: yup.string().required('Missing last name'),
});

module.exports.loginSchema = loginSchema;
module.exports.registerSchema = registerSchema;
