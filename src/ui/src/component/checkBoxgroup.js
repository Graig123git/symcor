import React from 'react';
import { Field, useField, ErrorMessage } from 'formik';

function CheckBoxGroup(props) {
	const { name, options } = props;
	return (
		<div>
			<Field name={name} {...options}>
				{({ field }) => {
					return options.map((option) => {
						return (
							<React.Fragment key={options.key}>
								<input
									type='checkbox'
									id={option.value}
									{...field}
									{...props}
									value={options.value}
									checked={field.value && field.value.includes(option.value)}
								/>
								<label htmlFor={option.value} className='pl-2 pr-2'>
									{option.key}
								</label>
							</React.Fragment>
						);
					});
				}}
			</Field>
		</div>
	);
}

export default CheckBoxGroup;
