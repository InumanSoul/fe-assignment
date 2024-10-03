import { useEffect, useState } from "react";
import Button from "../../components/Button";
import EmailIcon from "../../components/icons/Email";
import PadlockIcon from "../../components/icons/Padlock";
import Input from "../../components/Input";
import { formatErrorMessage, isFetchBaseQueryError, validateEmail } from "../../utils";
import { useLogin } from "../../infraestructure/hooks/useLogin";
import { LOGIN_ERROR_MESSAGES } from "../../utils/constants";

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const { handleLogin, isLoading, error } = useLogin();
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);	
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await handleLogin(email, password);
		} catch (error) {
			console.error(error);
		}
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		const emailIsValid = validateEmail(e.target.value);
		setEmailError(!emailIsValid ? LOGIN_ERROR_MESSAGES.INVALID_EMAIL : null);
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		const passwordIsValid = e.target.value.length >= 8;
		setPasswordError(!passwordIsValid ? LOGIN_ERROR_MESSAGES.PASSWORD_LENGTH : null);
	}

	useEffect(() => {
		const passwordIsValid = password.length >= 8;
		const emailIsValid = validateEmail(email);

		setIsValid(emailIsValid && passwordIsValid);
	}, [email, password]);

	return (
		<section className='w-full flex flex-col items-center justify-center h-dvh bg-zinc-200 dark:bg-zinc-950 px-8'>
			<img
				src='/images/logo.webp'
				alt='logo'
				className='h-10 mb-8 object-contain px-4 dark:invert'
			/>

			<div className='w-full max-w-lg flex flex-col p-8 md:p-14 rounded-lg bg-white dark:bg-zinc-800'>
				<div className='mb-10 space-y-4 text-center dark:text-zinc-50'>
					<h1 className='font-semibold text-3xl'>Welcome back!</h1>
					<p>Log in to continue with Opensend</p>
				</div>

				{error && (
					<div className='bg-red-200 text-red-700 rounded p-5 mb-5'>
						{isFetchBaseQueryError(error) ? formatErrorMessage(error) : 'Login failed'}
					</div>
				)}

				<form className='space-y-3 mb-2' onSubmit={handleSubmit}>
					<fieldset>
						<label htmlFor='email' className='sr-only'>Email</label>
						<Input
							type='email'
							value={email}
							onChange={handleEmailChange}
							placeholder='Email'
							icon={<EmailIcon className='flex-shrink size-5' />}
							error={emailError}
							required
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='password' className='sr-only'>Password</label>
						<Input
							type='password'
							value={password}
							onChange={handlePasswordChange}
							placeholder='Password'
							icon={<PadlockIcon className='flex-shrink size-5' />}
							error={passwordError}
							required
						/>
					</fieldset>
					<Button type='submit' variant='primary' className="w-full" disabled={!isValid}>
						{isLoading ? 'Logging in...' : 'Login'}
					</Button>
				</form>
				<Button variant='ghost' className="w-full">Forgot Your Password?</Button>
			</div>
		</section>
	);
};

export default LoginPage;
