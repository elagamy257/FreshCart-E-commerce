import React from 'react'
import img from '../../assets/images/register.jfif'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/userContext';
import { useContext } from 'react';

export default function Register() {
    let { setLogin } = useContext(userContext)   //{isLogin, setLogin} 

    let navigate = useNavigate();
    async function handleRegister(formsData) {
        console.log('register', formsData); //faten email 
        //   let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formsData);
        //   console.log('Full Response' , response);
        //   console.log('Certain Response' , response.data);
        //   if(response.data.message === 'success'){
        //     navigate('/login'); //programmatic routing >>>> useNavigate()
        // }


        // another way
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formsData)
            .then((response) => {
                console.log('success', response)
                if (response.data.message === 'success') {
                    localStorage.setItem('userToken', response.data.token)//key , value
                    setLogin(response.data.token)    //isLogin  =  response.data.token   
                    navigate('/login'); //programmatic routing
                }
            })

            .catch((error) => { console.log('error', error) })

    }

    // validation
    let validationSchema = Yup.object(
        {
            name: Yup.string().required('name is required').min(3, 'min length is 3').max(10, 'max length is 10'),
            email: Yup.string().required('email is required').email('enter valid email'),  //check on email @ .
            phone: Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/, 'phone is not valid'),
            password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'password is not valid'),
            rePassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')], 'Passwords must match'),

        }
    )



    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },

        validationSchema: validationSchema
        ,
        onSubmit: handleRegister
    })



    return (
        <>

            <section className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="text-center mb-3">
                                        <a href="#!">
                                            <img src={img} alt="BootstrapBrain Logo" width="175" height="57" />
                                        </a>
                                    </div>
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                                    <form onSubmit={formik.handleSubmit} action="#!">
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} name="name" value={formik.values.name} id="UserName" placeholder="UserName" required />
                                                    <label htmlFor="UserName" className="form-label">UserName</label>
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <div className="text-danger">{formik.errors.name}</div>
                                                    ) : null
                                                    }

                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} name="email" value={formik.values.email} id="email" placeholder="name@example.com" required />
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className="text-danger">{formik.errors.email}</div>
                                                    ) : null
                                                    }


                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} name="password" value={formik.values.password} id="password" placeholder="Password" required />
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <div className="text-danger">{formik.errors.password}</div>
                                                    ) : null}


                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`} name="rePassword" value={formik.values.rePassword} id="rePassword" placeholder="rePassword" required />
                                                    <label htmlFor="rePassword" className="form-label">rePassword</label>
                                                    {formik.touched.rePassword && formik.errors.rePassword ? (
                                                        <div className="text-danger">{formik.errors.rePassword}</div>
                                                    ) : null}

                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`} name="phone" value={formik.values.phone} id="phone" placeholder="phone" required />
                                                    <label htmlFor="phone" className="form-label">phone</label>
                                                    {formik.touched.phone && formik.errors.phone ? (
                                                        <div className="text-danger">{formik.errors.phone}</div>
                                                    ) : null}

                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree" required />
                                                    <label className="form-check-label text-secondary" htmlFor="iAgree">
                                                        I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button className="btn btn-primary btn-lg" type="submit">Register</button>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <p className="m-0 text-secondary text-center">Already have an account? <a href="#!" class="link-primary text-decoration-none">Sign in</a></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>


    )
}