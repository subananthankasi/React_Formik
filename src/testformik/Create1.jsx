import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const Create1 = () => {
    const initialValues={
        username:'',
        email:'',
        dob:'',
        password:'',
        cpassword:'',
        gender:'',
        number:'',
        language:[]
    }
    const strongpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    const validationSchema =yup.object().shape({
        username:yup
            .string()
            .min(5,'Minimum 5 charecters required')
            .required('*required!!'),
        email:yup
            .string()
            .email('Invalid email Address')
            .required('*required!!'),
        dob:yup
            .date()
            .max(new Date(),'Future is not applicable')
            .required('*required!!'),
        password:yup
           .string()
           .matches(strongpassword,"Create Strong password")
           .required('*required!!'),
        cpassword:yup
           .string()
          .oneOf(
            [yup.ref('password'),null],
                "confirm password and password are not matching"
            ) 
           .required('*required!!'),
        gender:yup
            .string()
            .required('*required!!'),
        number:yup
            .string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required('*required!!'),
    })

 

    const formik = useFormik({
     initialValues,
     validationSchema
    })

    const checkBox = (value) => {
        const languages = formik.values.language || []
        if(languages.includes(value)){
            formik.setFieldValue('language',languages.filter((lang)=>lang!==value))
        }
        else{
            formik.setFieldValue('language',[...languages,value])
        }
    }
   
  return (
   
    <>
    <div className='container'>
        <div className='card'>
            <h3>Login Page</h3>
                <form>
                    <div>
                        <label><b>Username</b></label>
                        <input type='text'
                            name='username'
                            placeholder='Enter username'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}  
                            className={`form-control 
                            ${formik.errors.username && formik.touched.username ?
                                "is-invalid":
                                !formik.errors.username&&formik.touched.username?
                                'is-valid':''}
                                `}  
                        />
                        {formik.errors.username && formik.touched.username?(<p style={{color:'red'}}>{formik.errors.username}</p>):null}
                    </div>
                    <div>
                        <label><b>Email</b></label>
                        <input type='email'
                            name='email'
                            placeholder='Enter username'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}  
                            className={`form-control 
                            ${formik.errors.email && formik.touched.email ?
                                "is-invalid":
                                !formik.errors.email&&formik.touched.email?
                                'is-valid':''}
                                `}  
                        />
                        {formik.errors.email && formik.touched.email?(<p style={{color:'red'}}>{formik.errors.email}</p>):null}
                    </div>
                    <div>
                        <label><b>DOB</b></label>
                        <input type='date'
                            name='dob'
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}  
                            className={`form-control 
                            ${formik.errors.dob && formik.touched.dob ?
                                "is-invalid":
                                !formik.errors.dob && formik.touched.dob?
                                'is-valid':''}
                                `}  
                        />
                        {formik.errors.dob && formik.touched.dob?(<p style={{color:'red'}}>{formik.errors.dob}</p>):null}
                    </div>
                    <div>
                        <label htmlFor="password"><b>Password</b> </label>
                        <input type='password'
                            name='password'
                            placeholder='Enter Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                                formik.errors.password && formik.touched.password ? 
                                'is-invalid' :
                                !formik.errors.password && formik.touched.password ?
                                'is-valid':
                                ''
                            }`}
                        />
                        {formik.errors.password && formik.touched.password ? (<p style={{color:'red'}}>{formik.errors.password}</p>):null}
                    </div>
                    <div>
                        <lable>Confirm Password</lable>
                        <input type='password'
                            name='cpassword'
                            placeholder='Enter confirm password'
                            value={formik.values.cpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                                formik.errors.cpassword && formik.touched.cpassword ? 
                                'is-invalid':
                                !formik.errors.cpassword && formik.touched.cpassword ?
                                'is-valid':
                                '' 
                            }`}
                        />
                        { formik.errors.cpassword && formik.touched.cpassword ? (<p style={{color:'red'}}>{formik.errors.cpassword} </p>):null}
                    </div>
                    <div>
                        <label><b>Gender</b></label>
                        <div>
                            <label>Male</label>
                            <input type='radio'
                                value='male'
                                name='gender'
                                checked={formik.values.gender==='male'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label>Female</label>
                            <input type='radio'
                                value='female'
                                name='gender'
                                checked={formik.values.gender==='female'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label>Others</label>
                            <input type='radio'
                                value='others'
                                name='gender'
                                checked={formik.values.gender==='others'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.gender ?(<p style={{color:'red'}}>{formik.errors.gender} </p>) : null}
                        </div>
                    </div>
                    <div>
                        <label><b>Phone number</b> </label>
                        <input type='number'
                            name='number'
                            placeholder='Enter phonenumber'
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                                formik.errors.number && formik.touched.number ?
                                'is-invalid':
                                !formik.errors.number && formik.touched.number ?
                                'is-valid' :
                                ''
                            }`}
                        />
                        {formik.errors.number && formik.touched.number ? (<p style={{color:'red'}}>{formik.errors.number} </p>):null}
                    </div>
                    <div>
                        <label className='form-lable'>Language</label>
                        <div>
                            <label>Tamil</label>
                            <input type="checkbox" 
                                name='language'
                                value='tamil'
                                checked={formik.values.language.includes("tamil")}
                                onChange={()=>checkBox('tamil')}
                                
                            />
                            <label>English</label>
                            <input type="checkbox" 
                                name='language'
                                value='english'
                                checked={formik.values.language.includes("english")}
                                onChange={()=>checkBox('english')}
                            />
                            <label>Others</label>
                            <input type="checkbox" 
                                name='language'
                                value='others'
                                checked={formik.values.language.includes("others")}
                                onChange={()=>checkBox('others')}
                            />
                        </div>
                    </div>
                </form>
        </div>
    </div>
    
    </>
  )
}

export default Create1