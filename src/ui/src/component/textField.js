import React from 'react';
import { useField, ErrorMessage } from 'formik';

export const TextField = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='mb-4'>
			<label htmlFor={field.name}>{label}</label>
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
