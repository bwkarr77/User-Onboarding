import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, isSubmitting, touched, status }) => {
  //==========STEP 4 - DISPLAY RETURNED DATA TO SCREEN=========//
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  //=======END STEP 4=======//

  return (
    <div className="form-container">
      <Form>
        <div className="form-content">
          <Field type="name" name="name" placeholder="Enter Name" />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </div>
        <div className="form-content">
          {/* if there's an error */}
          <Field type="email" name="email" placeholder="Enter Email" />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-content">
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <div className="select-section">
          <label>
            Location:
            <Field component="select" name="location">
              <option value="CA">CA</option>
              <option value="FA">FA</option>
              <option value="IL">IL</option>
              <option value="WA">WA</option>
              <option value="TX">TX</option>
            </Field>
          </label>
          <label>
            Role:
            <Field component="select" name="role">
              <option value="Cook">Cook</option>
              <option value="Programmer">Programmer</option>
              <option value="Engineer">Engineer</option>
              <option value="Project Coordinator">Project Coordinato</option>
              <option value="Nun-ya">Nun-ya</option>
            </Field>
          </label>
        </div>
        <label>
          <Field
            className="terms-check"
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          Accept Terms of Service
        </label>
        <button type="submit" disabled={isSubmitting}>
          Submit!
        </button>
        <div className="user-div">
          <h1>Users:</h1>
          {values.user &&
            values.users.map(user => console.log("These guys: ", user))}
          <div className="user-card">
            {users
              ? users.map(user => (
                  <p key={user.id} className="users">
                    {user.id}
                  </p>
                  // <p key={user.location} className="users">{user.location}</p>
                ))
              : null}
          </div>
        </div>
      </Form>
    </div>
  );
};

//======STEP 1 - FORMIK FORM========/

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, location, terms, role, users }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      location: location || "CA",
      role: role || "Guardian",
      terms: terms || false,
      users: [`Example`]
    };
  },

  //===========STEP 2 - VALIDATION SECTION=================

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

  //===========END VALIDATION SCHEMA==============//

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    //======STEP 3 - MAKE A POST REQUEST=======//
    axios
      .post(`https://reqres.in/api/user/`, values)
      //.post sends out data (values)
      .then(res => {
        //.then do {} with the response from the .post
        setStatus(res.data);
        console.log(res.data);
        //looking for id: ## == response
      })
      .catch(err => {
        console.log(err);
      });

    setTimeout(() => {
      if (values.email === "waffle@syrup.com") {
        //made-up email as an example
        setErrors({ email: "Yo, Seats Taken. SEATS...TAKEN!" });
      } else {
        resetForm();
      }
      setSubmitting(false); //WHAT DOES THIS DO!?!?!?!?
    }, 1000); //delays the resetForm by 1000ms.
  }
})(UserForm);

export default FormikUserForm;
