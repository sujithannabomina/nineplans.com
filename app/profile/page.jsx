// Server component wrapper around the client profile UI
import ProfileClient from '@/components/ProfileClient';

export const metadata = { title: 'Profile • NinePlans' };

export default function ProfilePage() {
  return <ProfileClient />;
}
