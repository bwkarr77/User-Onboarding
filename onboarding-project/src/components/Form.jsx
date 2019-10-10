import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched }) => {
  return (
    <Form>
      <div className="Form-Fill">
        <Field type="name" name="name" placeholder="Enter Name" />
        {touched.name && errors.name && <p>{errors.name}</p>}
      </div>
      <div className="Form-Fill">
        {/* if there's an error */}
        <Field type="email" name="email" placeholder="Enter Email" />
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <div className="Form-Fill">
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <Field component="select" name="location">
        <option value="CA">CA</option>
        <option value="FA">FA</option>
        <option value="IL">IL</option>
        <option value="WA">WA</option>
        <option value="TX">TX</option>
      </Field>
      <label>
        <Field
          className="terms-check"
          type="checkbox"
          name="terms"
          checked={values.terms}
        />
        Accept Terms of Service
      </label>
      <button>Submit!</button>
    </Form>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, location, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      location: location || "CA",
      terms: terms || false
    };
  },

  //===========VALIDATION SECTION=================

  //~~~~~~~~~~~Part for Yup Stuff~~~~~~~~~~~~~~~~
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Yo, get your email straight")
      .required("Email esta nesesaria"),
    password: Yup.string()
      .min(6, "Come on Homie, add some more info")
      .required("Yea, you need a password"),
    name: Yup.string().required("What shall we call you?"),
    terms: Yup.bool().oneOf(
      [true],
      "click it and give me your soul, errr permission"
    )
  }),

  //===========END VALIDATION SCHEMA==============

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    console.log(values);
    //Form code, http requests, etc.
    axios
      // .get(`https://reqres.in/api/user/`)
      .post(`https://reqres.in/api/user/`, values)
      .then(res => {
        setStatus(res.data);
        // console.log(res.data);
      });

    // setTimeout(() => {
    //   if(values.email ===)
    // })
  }
})(UserForm);

export default FormikUserForm;
