interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	variant?: 'primary' | 'ghost';
}

const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
	const buttonType = {
		primary: 'px-3 py-2 rounded bg-primary hover:bg-green-900 text-white',
		ghost:
			'px-3 py-2 rounded border border-zinc-300 hover:border-zinc-600 dark:border-zinc-500 dark:hover:border-zinc-300 dark:text-white',
	};
	return (
		<button className={`duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold ${buttonType[variant]} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
