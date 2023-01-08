import React, { createRef } from 'react';
import '../../styles/forms.css';

const Input = ({
	type,
	name,
	placeholder,
	labelName,
	inputHandler,
	styles = [],
	required = false,
	pattern,
	defaultInputValue = '',
	disabled = false,
	value,
	sendEmail
}) => {
	const textInput = createRef();
	return (
		<div className="input-container mt-6">
			<label htmlFor={name} id={`${name}Label`} className="block">
				{labelName}
			</label>
			<input
				type={type}
				name={name}
				onChange={inputHandler}
				required={required}
				className={`${sendEmail
					? 'w-64 '
					: 'w-full '} border input-text mt-3 border-gray-400	rounded appearance-none  py-2 px-4 text-gray-700 leading-tight`}
				placeholder={placeholder}
				ref={textInput}
				style={ styles }
				defaultValue={defaultInputValue}
				pattern={pattern}
				disabled={disabled}
				value={value}
				step={type === 'number' ? 'any' : ''}
				autoComplete="off"
				min={type === 'number' ? 0 : ''}
			/>
			<span className="error" id={`${name}Error`} />
		</div>
	);
};

export default Input;
