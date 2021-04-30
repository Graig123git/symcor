import { Formik, Form, Field } from 'formik';
import { TextField } from './textField';
import './form.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const SignUpForm = () => {
	const validate = Yup.object({
		clientName: Yup.string().required('*Required'),
		publicKey: Yup.string().required('*Required'),
		secretDescription: Yup.string().required('*Required'),
	});

	const handleSubmit = async (e) => {
		try {
			const Url = 'xxx';
			let axiosConfig = {
				headers: {
					'x-api-key': 'xxx',
					Host: 'x',
					'x-request-id': 'x',
					'x-fapi': 'x',
					'x-app-cat-id': 'x',
				},
			};
			const base64String = await axios.post(Url, axiosConfig);
			console.info(base64String);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Formik
			initialValues={{
				clientName: '',
				publicKey: '',
				secretDescription: '',
				clientScope: [],
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
								<div className='mb-4'>
									<span>Scope</span>
								</div>
								<div role='group' aria-labelledby='checkbox-group' className='d-flex justify-content-between'>
									<label>
										<span className='pr-1'>accountInfo</span>
										<Field type='checkbox' name='checked' value='One' />
									</label>
									<label>
										<span className='pr-1'>updateAccountInfo</span>
										<Field type='checkbox' name='checked' value='Two' />
									</label>
									<label>
										<span className='pr-1'>deleteAccountInfo</span>
										<Field type='checkbox' name='checked' value='Three' />
									</label>
								</div>
							</div>
							<div className='d-flex justify-content-center'>
								<button className='btn btn-primary mt-3 col-sm-6 mb-5' type='submit'>
									Register
								</button>
							</div>
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
	);
};

export default SignUpForm;
