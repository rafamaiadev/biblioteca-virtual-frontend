import type { ReactNode } from 'react';
import UserProfileMenu from "../../components/UserProfile.tsx";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
        <UserProfileMenu />
      <main className="flex-grow container m-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

