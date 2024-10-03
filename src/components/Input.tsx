interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string | null;
  icon: React.ReactNode | null;
}

const Input = ({
  className,
  icon,
  error,
  ...props
}: InputProps) => {
  return (
		<>
			<div className='relative flex items-center gap-2 border w-full px-3 py-2 rounded border-zinc-300 dark:border-zinc-700'>
				{icon}
				<input
					{...props}
					className={`dark:text-white w-full flex-1 py-1 bg-transparent outline-none ${className}`}
				/>
			</div>
			{error && <div className='text-red-700 text-sm mt-1'>{error}</div>}
		</>
	);
}

export default Input