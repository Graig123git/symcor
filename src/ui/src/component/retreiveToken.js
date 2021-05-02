import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { Formik, Form, Field } from 'formik';
import { TextField } from './textField';
import './form.css';
import * as Yup from 'yup';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function RetreiveToken() {
	const [success, setSuccess] = useState(false);
	const [successData, setsuccessData] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsloading] = useState(false);

	const validate = Yup.object({
		base64Arn: Yup.string().required('*Required'),
		bmoParterId: Yup.string().required('*Required'),
		clinetSecret: Yup.string().required('*Required'),
		PublicKey: Yup.string().required('*Required'),
		apiKey: Yup.string().required('*Required'),
	});

	const handleSubmit = async (e) => {
		try {
			setIsloading(true);
			const params = {
				base64Arn: e.base64Arn,
				bmoParterId: e.bmoParterId,
				clinetSecret: e.clinetSecret,
				PublicKey: e.PublicKey,
			};
			const response = await axios.post(`api/getToken/`, params);
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
		<Formik
			initialValues={{
				base64Arn: '',
				bmoParterId: '',
				clinetSecret: '',
				PublicKey: '',
				apiKey: '',
			}}
			validationSchema={validate}
			onSubmit={handleSubmit}
		>
			{(formik) => (
				<div>
					<div className='mt-5 col-sm-3 container'>
						<h2 className='mb-5'>BMO Partner's Token Service</h2>
						<Form>
							<div className='mb-5'>
								<TextField label='Bmo Partner ID' name='bmoParterId' type='text' />
								<TextField label='Encoded String' name='base64Arn' type='text' />
								<TextField label='Clinet Secret' name='clinetSecret' type='text' />
								<TextField label='Public Key' name='PublicKey' type='text' />
								<TextField label='Client API KEY' name='apiKey' type='text' />
							</div>
							<div className='d-flex justify-content-center'>
								<button
									disabled={isLoading ? true : false}
									className='btn btn-primary mt-3 col-sm-6 mb-5'
									type='submit'
								>
									{isLoading ? <Spinner size={25} color='#00778F' /> : <span>Register</span>}
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
							<div className='d-flex justify-content-center'>
								<div>
									<Link to='/'>
										{' '}
										<span className='text-color textFont'>Dont have an Account ? Register</span>
									</Link>
								</div>
							</div>
						</Form>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default RetreiveToken;
