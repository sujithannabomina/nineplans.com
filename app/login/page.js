// Server Component wrapper so we can export `metadata` safely
import LoginClient from './LoginClient';

export const metadata = { title: 'Login • NinePlans' };

export default function LoginPage() {
  return <LoginClient />;
}
