import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/navigation/BottomNav';

export default function AppLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}
