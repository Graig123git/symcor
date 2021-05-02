import React from 'react';
import { useField, ErrorMessage } from 'formik';
import './form.css';

export const TextField = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='mb-4'>
			<label className='textFont' htmlFor={field.name}>
				{label}
			</label>
			<input
				className={`form-control form-control-lg ${meta.touched && meta.error && 'is-invalid'}`}
				{...field}
				{...props}
				autoComplete='off'
			/>
			<ErrorMessage name={field.name} />
		</div>
	);
};
