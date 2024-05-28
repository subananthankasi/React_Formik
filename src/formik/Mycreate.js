import { ErrorMessage, Field, Form, Formik  } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { API_URL } from '../Api/URL'
import axios from 'axios'


const validationSchema = yup.object().shape({
  username:yup.string()
          .min(5,'minimum 5 letters')
          .required('required!!!'),
  email:yup.string()
          .email('Enter valid email')
          .required('required!!!'),
  dob: yup.date()
          .max(new Date(), ' Birthday date cannot be in the future')
          .required('required!!!'),
  gender:yup.string()
          .required('select one !!!'),
  password:yup.string()
          .min(8,'password must have atleast 8 characters')
          .matches(
           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
          'Create strong password'
          )
          .required('required!!!'),
  cpassword:yup.string()
          .required('required!!!')
          .oneOf([yup.ref('password')], 'password not match'),
  number:yup.string()
           .min(10,'Invalid Phonenumber!!')
           .max(10,'invalid Phonenumber!!')
          .required('required!!!'),
  language: yup.array()
          .min(1, 'Please select at least one language'),
          // .of( 
          //     yup.string() 
          //     .oneOf(['tamil', 'english'], 'Invalid language selection')  
          //     ),
  nationality:yup.string()
          .required('required!!!'),        
       
})

const Create = () => {

  const navigate = useNavigate();
  const initialValues = {
    username:'',
    email:'',
    dob:'',
    gender:'',
    password:'',
    cpassword:'',
    number:'',
    language:[],
    nationality:'',
    id:null
  
  }

  const onSubmit = async (values) => {
    console.log('Form submitted:', values);
   
   
   
    try {
      await axios.post(API_URL, values);  
    }
     catch (error) {
      console.error('Error submitting form:', error);
    }
     navigate('/read');
  };
 
  return (    
    <div className='container mt-3 mb-3' style={{ width: "675px"}}>
      <div className='row'>
      <div className='col-lg'>
      <div className='card p-3' style={{boxShadow:"2px 2px 3px 3px gray"}}>
      <div>
          <h3 style={{ textAlign: "center", color: "blue" }}>LOGIN PAGE</h3>
      </div>
      <div className='card-body'>
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
       
        >
        
        {
          formik =>{
            return(
              
              <Form autoComplete='off'>
                <div>
                <label className='form-label' htmlFor='username' style={{ fontWeight: "700" }}>USERNAME :</label>
                  <Field type = 'text' name='username' id='username' className='form-control mt-2' />
                  <ErrorMessage name='username'>
                    {
                      errmsg => (<p className='error'>{errmsg} </p>)
                    }
                   
                   </ErrorMessage> 
                </div>

                <div>
                <label className='form-label' htmlFor='email' style={{ fontWeight: "700" }}>EMAIL :</label>
                  <Field type = 'email' name='email' id='email'  className='form-control mt-2'/>
                  <ErrorMessage name='email'>
                    {
                      errmsg => (<p className='error'>{errmsg} </p>)
                    }
                   </ErrorMessage> 
                </div>

                <div className='field'>
                <label className='form-label' htmlFor='dob' style={{ fontWeight: "700" }}>DOB :</label>
                  <Field type = 'date' name='dob' id='dob'  className='form-control mt-2' />
                  <ErrorMessage name='dob'>
                    {
                      errmsg => (<p className='error'>{errmsg} </p>)
                    }
                   </ErrorMessage> 
                </div>

                <div className='mt-3'>
                <label className='form-label' style={{ fontWeight: "700" }}>GENDER :</label>
               
                  <div className="form-check d-flex mt-2">
                    <Field type = 'radio' name='gender' id='male' value='male'  className="form-check-input" /> 
                    <label htmlFor="male" className="form-check-label ps-2">Male</label>
                  
                    <Field type = 'radio' name='gender' id='female' value ='female' className="form-check-input ms-3" /> 
                    <label htmlFor="female" className="form-check-label ps-2">Female</label>
                 
                    <Field type = 'radio' name='gender' id='other' value='other' className="form-check-input ms-3"  /> 
                    <label htmlFor="others" className="form-check-label ps-2">Others</label>
                    </div>                  
                  <ErrorMessage name='gender'>
                    {
                      errmsg => (<p className='error'>{errmsg} </p>)
                    }
                   </ErrorMessage> 
                </div>

                <div className='mt-3'>
                <label className='form-label' htmlFor='password' style={{ fontWeight: "700" }}>PASSWORD :</label>
                  <Field type = 'password' name='password' id='password' className='form-control mt-2' />
                  <ErrorMessage name='password'>
                    {
                      errmsg => (<p className='error'>{errmsg} </p>)
                    }
                   </ErrorMessage> 
                  
                </div>

                <div className='mt-3'>
                <label className='form-label' htmlFor='cpassword' style={{ fontWeight: "700" }}>CONFIRM PASSWORD :</label>
                  <Field type = 'password' name='cpassword' id='cpassword' className='form-control mt-2' />
                  <ErrorMessage name='cpassword'>
                    {
                      errmsg => (<p className='error'>{errmsg} </p>)
                    }
                   </ErrorMessage> 
                </div>

                <div className='mt-3'>
                <label className='form-label' htmlFor='number' style={{ fontWeight: "700" }}>PHONENUMBER :</label>
                <Field type = 'number' name='number' id='number' className='form-control mt-2 suba' />
                  <ErrorMessage name='number'>
                 
                    {
                      errmsg => (<p className='error'>{errmsg} </p>)
                    }
                   </ErrorMessage> 
             
                </div>
                <div className='mt-3'>
                <label className='form-label' style={{ fontWeight: "700" }}>LANGUAGE :</label>
                <div className="form-check d-flex mt-2">
                
                 <Field type='checkbox' name='language' value='tamil' id='tamil'   className="form-check-input" />
                 <label className="form-check-label ps-1 pe-5" htmlFor='language' style={{ fontWeight: "700" }}>TAMIL</label>
                
                 <Field type='checkbox' name='language' value='english' id='english'   className="form-check-input" />
                 <label className="form-check-label ps-1 pe-5" htmlFor='language' style={{ fontWeight: "700" }}>ENGLISH</label>

              
                 <Field type='checkbox' name='language' value='hindi' id='hindi'   className="form-check-input" />
                 <label className="form-check-label ps-1 pe-5" htmlFor='language' style={{ fontWeight: "700" }}>HINDI</label>
                 </div>
                 <ErrorMessage name='language'>
                    {errmsg => <p className='error'>{errmsg}</p>}
                </ErrorMessage>
                </div>

                <div className='mt-3'>
                <label className='form-label' htmlFor='nation' style={{ fontWeight: "700" }}>NATIONALITY :</label>
                  <Field as='select' name='nationality' id='nationality'  className="form-select mt-2 " >
                    <option value="">Choose</option>
                    <option value="India">India</option>
                    <option value="singapore">singapore</option>
                    <option value="America">America</option>
                    <option value="Jaban">Jaban</option>
                  </Field>
                  <ErrorMessage name='nationality'>
                    {
                      errmsg => <p className='error'>{errmsg} </p>
                    }
                  </ErrorMessage>
                </div>
        
                <div>
                  <button type='submit'className='btn btn-info mt-3' style={{ fontWeight: 700, color: "white", float: "inline-end", letterSpacing: "2px" }} >Login</button>
                </div>

              </Form>
             
            )
          }
        }
      </Formik>
      </div>
      </div>
      </div>
      </div>
      </div>
  )
}

export default Create