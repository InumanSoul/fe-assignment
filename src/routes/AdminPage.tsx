import Authenticated from "../components/Authenticated"
import Button from "../components/Button";
import { formatDate } from "../utils";
import { useUser } from "../infraestructure/hooks/useUser";

const AdminPage = () => {
  const { user, handleLogout } = useUser();

  return (
		<section className='container'>
			<h1 className='text-5xl font-bold dark:text-white'>Admin Page</h1>
      <div className="p-5 rounded-lg border dark:border-zinc-600 my-5">
        <p className="dark:text-white">Welcome, {user.first_name}</p>
        <p className="text-sm text-zinc-400 dark:text-zinc-600">Member since: {formatDate(user.date_joined)}</p>
      </div>
			<Button variant='primary' onClick={handleLogout}>
				Logout
			</Button>
		</section>
	);
}

const AuthenticatedAdminPage = Authenticated(AdminPage);
export default AuthenticatedAdminPage;