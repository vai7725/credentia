import { isSetupComplete } from '@/actions/setup';
import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  const setupData = await isSetupComplete();

  const setup = setupData.data as {
    isProfileComplete: boolean;
    activePage: number;
    role: string;
  };

  if (auth.status === 403 || auth.status === 400 || auth.status === 500) {
    return redirect('/auth/sign-in');
  }

  if ((auth.status === 200 || auth.status === 201) && setup.isProfileComplete) {
    return redirect('/dashboard');
  }

  if ((auth.status === 200 || auth.status === 201) && setup.activePage === 0) {
    return redirect('/setup');
  }

  if (
    (auth.status === 200 || auth.status === 201) &&
    setup.role === 'CANDIDATE'
  ) {
    return redirect('/setup/candidate');
  }

  if (
    (auth.status === 200 || auth.status === 201) &&
    setup.role === 'COMPANY'
  ) {
    return redirect('/setup/company');
  }

  if ((auth.status === 200 || auth.status === 201) && setup.role === 'ADMIN') {
    return redirect('/dashboard');
  }

  if (
    (auth.status === 200 || auth.status === 201) &&
    setup.isProfileComplete === true
  ) {
    return redirect('/dashboard');
  }
};

export default AuthCallbackPage;
