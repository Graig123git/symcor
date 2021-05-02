import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { Formik, Form, Field } from 'formik';
import { TextField } from './textField';
import './form.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const SignUpForm = () => {
	const [success, setSuccess] = useState(false);
	const [successData, setsuccessData] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsloading] = useState(false);

	const validate = Yup.object({
		clientName: Yup.string().required('*Required'),
		publicKey: Yup.string().required('*Required'),
		secretDescription: Yup.string().required('*Required'),
		checked: Yup.array().min(1, 'at least one must be selected'),
	});

	const handleSubmit = async (e) => {
		try {
			setIsloading(true);
			const scope = e.checked.map((x) => {
				return {
					ScopeName: x,
				};
			});
			const params = {
				clientName: e.clientName,
				publicKey: e.publicKey,
				secretDescription: e.secretDescription,
				clientScope: scope,
			};
			const response = await axios.post(`api/create/`, params);
			if (response.data.data) {
				setError(false);
				setErrorMessage('');
				setsuccessData(JSON.stringify(response.data));
				setSuccess(true);
				setIsloading(false);
			} else {
				setSuccess(false);
				setsuccessData('');
				setErrorMessage(JSON.stringify(response.data));
				setError(true);
				setIsloading(false);
			}
		} catch (err) {
			setIsloading(false);
			alert(err);
		}
	};

	return (
		<>
			<Formik
				initialValues={{
					clientName: '',
					publicKey: '',
					secretDescription: '',
					toggle: false,
					checked: [],
				}}
				validationSchema={validate}
				onSubmit={handleSubmit}
			>
				{(formik) => (
					<div>
						<div className='mt-5 col-sm-3 container'>
							<h2 className='mb-5'>BMO Partner's SignUp Service</h2>

							<Form>
								<div className='mb-5'>
									<TextField label='Client Name' name='clientName' type='text' />
									<TextField label='Public Key' name='publicKey' type='text' />
									<TextField label='Secret Description' name='secretDescription' type='text' />
								</div>
								<div className='mb-4'>
									<div id='checkbox-group' className='mb-5'>
										<span className='textFont'>Scope</span>
									</div>
									<div role='group' aria-labelledby='checkbox-group' className='d-flex justify-content-between'>
										<label>
											<span className='pr-1 textFont'>accountInfo</span>
											<Field type='checkbox' name='checked' value='accountInfo' />
										</label>
										<label>
											<span className='pr-1 textFont'>eligibility</span>
											<Field type='checkbox' name='checked' value='eligibility' />
										</label>
										<label>
											<span className='pr-1 textFont'>paymentinit</span>
											<Field type='checkbox' name='checked' value='paymentinit' />
										</label>
									</div>
								</div>
								<div className='d-flex justify-content-center'>
									<button
										disabled={isLoading ? true : false}
										className='btn btn-primary mt-3 col-sm-6 mb-5'
										type='submit'
									>
										{isLoading ? <Spinner size={25} color='#00778F' /> : <span className='textFont'>Register</span>}
									</button>
								</div>
								{success ? (
									<div className='mb-4'>
										<span className='text-success textFont'>{successData}</span>
									</div>
								) : null}

								{error ? (
									<div className='mb-4'>
										<span className='text-danger'>{errorMessage}</span>
									</div>
								) : null}

								<div className='d-flex justify-content-between'>
									<div>
										<Link to='/getToken'>
											<span className='text-color textFont'>Already Registered ? Retrieve Token</span>
										</Link>
									</div>
									<div>
										<Link to='/'>
											<span className='text-color textFont'>Update Account</span>
										</Link>
									</div>
								</div>
							</Form>
						</div>
					</div>
				)}
			</Formik>
		</>
	);
};

export default SignUpForm;
