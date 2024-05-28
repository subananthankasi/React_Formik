import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../Api/URL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Create() {
  const [showPassword, setShowpassword] = useState(false);
  const [showCPassword, setShowCpassword] = useState(false);
  const Navigate = useNavigate();

  const onSubmit = async () => {
    await axios.post(API_URL, {
      username: formik.values.username,
      email: formik.values.email,
      dob: formik.values.dob,
      password: formik.values.password,
      cpassword: formik.values.cpassword,
      number: formik.values.number,
      nationality: formik.values.nationality,
      gender: formik.values.gender,
      languages: formik.values.languages,
    });
    Navigate("/read");
  };
  const handleCheckboxChange = (value) => {
    const language = formik.values.languages;
    if (language.includes(value)) {
      formik.setFieldValue(
        "languages",
        language.filter((lang) => lang !== value)
      );
    } else {
      formik.setFieldValue("languages", [...language, value]);
    }
  };

  const strongpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      dob: "",
      password: "",
      cpassword: "",
      number: "",
      nationality: "",
      gender: "",
      languages: [],
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(5, "Username must have atleast 5 characters")
        .required("*required!!"),
      email: yup
        .string()
        .email("Invalid Email address")
        .required("*required!!"),
      dob: yup.date()
        .max(new Date(), ' Birthday date cannot be in the future')
        .required("*required!!"),
      password: yup
        .string()
        .min(6, "password must have atleast 6 characters")
        .matches(strongpassword, "create a strong password")
        .required("*required!!"),
      cpassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "confirm password and password are not matching"
        )
        .required("*required!!"),
      number: yup
        .string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .min(10,'Invalid Phonenumber!!')
        .max(10,'invalid Phonenumber!!')
        .required("*required!!"),
      nationality: yup
        .string()
        .required("*required!!"),
      gender: yup
        .string()
        .required("*please select the gender"),
      languages: yup
        .array()
        .min(1, "select atleast one language"),
    }),
    onSubmit,
  });
   console.log(formik.values);
  return (
    <div className="container my-4" id="create">
      <div className="card w-50 mx-auto px-4 shadow">
        <h3 className="text-center text-primary mt-3">LOGIN PAGE</h3>
        <form className="my-3" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username" className="form-label">
             <b> Username:</b>
            </label>
            <input
              type="text"
              className={`form-control ${
                formik.errors.username && formik.touched.username ? "is-invalid" : formik.touched.username && !formik.errors.username ? "is-valid": ""
              }`}
              placeholder="Enter UserName"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username && (
              <p className="invalid-feedback">{formik.errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="form-label">
             <b>Email:</b> 
            </label>
            <input
              type="email"
              className={`form-control ${
                formik.errors.email && formik.touched.email
                  ? "is-invalid"
                  : !formik.errors.email && formik.touched.email
                  ? "is-valid"
                  : ""
              }`}
              placeholder="Enter email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="invalid-feedback">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="dob" className="form-label">
             <b>Date of birth:</b> 
            </label>
            <input
              type="date"
              className={`form-control ${
                formik.errors.dob && formik.touched.dob
                  ? "is-invalid"
                  : !formik.errors.dob && formik.touched.dob
                  ? "is-valid"
                  : ""
              }`}
              placeholder="Enter Date of Birth"
              id="dob"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.dob && formik.touched.dob && (
              <p className="invalid-feedback">{formik.errors.dob}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="form-label">
            <b>Gender:</b>  
            </label>
            <div className="">
              <input
                type="radio"
                className="form-check-input me-1"
                id="male"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="male" className="form-check-label me-2">
                Male
              </label>
              <input
                type="radio"
                className="form-check-input me-1"
                id="Female"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
              />
              <label htmlFor="Female" className="form-check-label me-2">
                Female
              </label>
              <input
                type="radio"
                className="form-check-input me-1"
                id="Others"
                name="gender"
                value="others"
                checked={formik.values.gender === "others"}
                onChange={formik.handleChange}
              />
              <label htmlFor="Others" className="form-check-label me-2">
               Others
              </label>
            </div>
            {formik.errors.gender && formik.touched.gender && (
              <p className="error">{formik.errors.gender}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="form-label">
             <b>Password:</b> 
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control  ${
                  formik.errors.password && formik.touched.password
                    ? "is-invalid"
                    : !formik.errors.password && formik.touched.password
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Enter password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              <i
                onClick={() => setShowpassword(!showPassword)}
                className={`absolute fa-regular fa-eye${
                  showPassword ? "-slash" : ""
                }`}
              ></i>
              {formik.errors.password && formik.touched.password && (
                <p className="invalid-feedback">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="cpassword" className="form-label">
             <b>Confirm password:</b> 
            </label>
            <div className="relative">
              <input
                type={showCPassword ? "text" : "password"}
                className={`form-control ${
                  formik.errors.cpassword && formik.touched.cpassword
                    ? "is-invalid"
                    : !formik.errors.cpassword && formik.touched.cpassword
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Enter Confirm Password"
                id="cpassword"
                name="cpassword"
                value={formik.values.cpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <i
                onClick={() => setShowCpassword(!showCPassword)}
                className={`absolute fa-regular fa-eye${
                  showCPassword ? "-slash" : ""
                }`}
              />
              {formik.errors.cpassword && formik.touched.cpassword && (
                <p className="invalid-feedback">{formik.errors.cpassword}</p>
              )}
            </div>
          </div>

          <div>
            <label  className="form-label">
            <b> Phone number:</b> 
            </label>
            <input
              type="number"
              className={`form-control ${
                formik.errors.number && formik.touched.number
                  ? "is-invalid"
                  : !formik.errors.number && formik.touched.number
                  ? "is-valid"
                  : ""
              }`}
              placeholder="Enter Phone Number"
              id="mobile"
              name="number"
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.number && formik.touched.number && (
              <p className="invalid-feedback">{formik.errors.number}</p>
            )}
          </div>

          <div>
            <label htmlFor="lang" className="form-label">
             <b>Language:</b> 
            </label>
            <div>
              <input
                type="checkbox"
                className="form-check-input me-1"
                id="tamil"
                name="languages"
                value="tamil"
                checked={formik.values.languages.includes("tamil")}
                onChange={() => handleCheckboxChange("tamil")}
              />
              <label htmlFor="tamil" className="form-check-label me-2">
               Tamil
              </label>
              <input
                type="checkbox"
                className="form-check-input me-1"
                id="english"
                name="languages"
                value="english"
                checked={formik.values.languages.includes("english")}
                onChange={() => handleCheckboxChange("english")}
              />
              <label htmlFor="English" className="form-check-label me-2">
              English
              </label>
              <input
                type="checkbox"
                className="form-check-input me-1"
                id="Hindi"
                name="languages"
                value="hindi"
                checked={formik.values.languages.includes("hindi")}
                onChange={() => handleCheckboxChange("hindi")}
              />
              <label htmlFor="Hindi" className="form-check-label me-2">
              Hindi
              </label>
            </div>
            {formik.errors.languages && formik.touched.languages && (
              <p className="error">{formik.errors.languages}</p>
            )}
          </div>
          <div>
            <label htmlFor="nationality" className="form-label">
             <b>Nationality:</b> 
            </label>
            <select
              type="select"
              className={`form-control ${
                formik.errors.nationality && formik.touched.nationality
                  ? "is-invalid"
                  : !formik.errors.nationality && formik.touched.nationality
                  ? "is-valid"
                  : ""
              }`}
              id="nationality"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value=''>CHOOSE</option>
              <option value='indian' >Indian</option>
              <option  value='American'>American</option>
              <option  value='Other'>Other</option>
            </select>
            {formik.errors.nationality && formik.touched.nationality && (
              <p className="invalid-feedback">{formik.errors.nationality}</p>
            )}
          </div>
          <div className="d-flex justify-content-end mt-3 me-2">
            <button type="submit" className="btn btn-info shadow submitbtn">
             <b>LOGIN</b> 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
