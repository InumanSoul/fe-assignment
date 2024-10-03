import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/api';
import { handleRedirection } from '../../domain/redirectionService';

export const useLogin = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password }).unwrap();
      
      localStorage.setItem('access_token', response.tokens.accessToken);
      localStorage.setItem('client_token', response.tokens.clientToken);
      localStorage.setItem('user', JSON.stringify(response.user));

      await handleRedirection(response.view, navigate);

      return response;
    } catch (error) {
      return error;
    }
  }

  return { handleLogin, isLoading, error };
}