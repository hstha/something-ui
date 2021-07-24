import React, { ChangeEvent, HTMLAttributes } from 'react';
import useLoginLogic from './use-login-logic';
import { Button, FormControl, Link, TextInput } from '../../components';
import { ButtonWrapper, StyledForm } from './styled';
import { H3 } from '../../layout';

export interface LoginModel {
	email?: string;
	password?: string;
}

export type SubmitHandler = (fieldValues: LoginModel) => void;

export interface LoginProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
	onSubmit?: SubmitHandler;
	initialValues?: LoginModel;
	loading?: boolean;
	registerLink?: string;
}

const Login: React.ForwardRefRenderFunction<HTMLFormElement, LoginProps> = (props, ref) => {
	const { onSubmit = () => {}, initialValues = {}, loading = false, registerLink = '#' } = props;

	const { values, errors, handleChange, handleSubmit } = useLoginLogic(onSubmit, initialValues);
	return (
		<StyledForm>
			<H3 align='center'>Sign In</H3>
			<FormControl label='Email' htmlFor='email' error={errors.email} forceLabel>
				<TextInput
					id='email'
					value={values.email}
					placeholder='Enter email'
					onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email')(e.currentTarget.value)}
					error={!!errors.email}
				/>
			</FormControl>
			<FormControl label='Password' htmlFor='password' error={errors.password} forceLabel>
				<TextInput
					id='password'
					type='password'
					value={values.password}
					placeholder='Enter password'
					onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password')(e.currentTarget.value)}
					error={!!errors.password}
				/>
			</FormControl>
			<ButtonWrapper>
				<Link href={registerLink}>Create account</Link>
				<Button onClick={handleSubmit} isLoading={loading}>
					Proceed
				</Button>
			</ButtonWrapper>
		</StyledForm>
	);
};

export default React.forwardRef<HTMLFormElement, LoginProps>(Login);
