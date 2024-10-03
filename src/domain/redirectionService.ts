import { api } from '../infraestructure/api/api';
import { store } from '../infraestructure/store';
import { CLIENT_TYPE, ROUTES } from '../utils/constants';

export const handleRedirection = async (
  view: { type: string; accesses?: { store_id: string }[] },
  navigate: (path: string) => void
) => {
	if (view.type === CLIENT_TYPE.ADMIN) {
		navigate(ROUTES.ADMIN);
	} else if (view.type === CLIENT_TYPE.CLIENT) {
		const storeId = view.accesses?.[0]?.store_id;

		if (storeId) {
			try {
				const response = await store.dispatch(api.endpoints.getStore.initiate(storeId));

				if (
					response.data &&
					response.data.store.onboarding_procedure.onboarding_status !== 'DONE'
				) {
					navigate(ROUTES.ONBOARDING);
				} else {
				  navigate(ROUTES.DASHBOARD);
        }
			} catch (error) {
				console.error('Failed to fetch store', error);
				navigate(ROUTES.LOGIN);
			}
		} else {
			navigate(ROUTES.LOGIN);
		}
	}
};
