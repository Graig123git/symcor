import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from './textField';
import CheckBoxGroup from './checkBoxgroup';
import './form.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const SignUpForm = () => {
	const [success, setSuccess] = useState(false);
	const [successData, setsuccessData] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const checkBoxOptions = [
		{ key: 'Option 1', value: 'accountinfo' },
		{ key: 'Option 2', value: 'deleteaccountinfo' },
		{ key: 'Option 3', value: 'updateaccountinfo' },
	];

	const validate = Yup.object({
		clientName: Yup.string().required('*Required'),
		publicKey: Yup.string().required('*Required'),
		secretDescription: Yup.string().required('*Required'),
		//checkboxOption: Yup.array().length(1, 'Required').required('Required'),
	});

	const handleSubmit = async (e) => {
		try {
			const params = {
				clientName: e.clientName,
				publicKey: e.publicKey,
				secretDescription: e.secretDescription,
				clientScope: [],
			};
			const response = await axios.post(`api/create/`, params);
			console.log(response);
			if (response.data.data) {
				setError(false);
				setErrorMessage('');
				setsuccessData(JSON.stringify(response.data));
				setSuccess(true);
			} else {
				setSuccess(false);
				setsuccessData('');
				setErrorMessage(JSON.stringify(response.data));
				setError(true);
			}
		} catch (err) {
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
					checkBoxOption: [],
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
									<div className='mb-4'>
										<span>Scope</span>
									</div>
									<CheckBoxGroup control='checkbox' name='checkBoxOption' options={checkBoxOptions} />
								</div>
								<div className='d-flex justify-content-center'>
									<button className='btn btn-primary mt-3 col-sm-6 mb-5' type='submit'>
										Register
									</button>
								</div>
								{success ? (
									<div className='mb-4'>
										<span className='text-success'>{successData}</span>
									</div>
								) : null}

								{error ? (
									<div className='mb-4'>
										<span className='text-danger'>{errorMessage}</span>
									</div>
								) : null}

								<div className='d-flex justify-content-between'>
									<div>
										<Link to='/getToken'>Already Registered ? Retrieve Token</Link>
									</div>
									<div>
										<Link to='/'>Update Account</Link>
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
