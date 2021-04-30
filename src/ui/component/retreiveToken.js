import { Formik, Form, Field } from 'formik';
import { TextField } from './textField';
import './form.css';
import * as Yup from 'yup';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function RetreiveToken() {
	const validate = Yup.object({
		base64Arn: Yup.string().required('*Required'),
		bmoParterId: Yup.string().required('*Required'),
		clinetSecret: Yup.string().required('*Required'),
		PublicKey: Yup.string().required('*Required'),
		apiKey: Yup.string().required('*Required'),
	});
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
								<button className='btn btn-primary mt-3 col-sm-6 mb-5' type='submit'>
									Retrieve Token
								</button>
							</div>
							<div className='d-flex justify-content-center'>
								<div>
									<Link to='/'>Dont have an Account ? Register</Link>
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
