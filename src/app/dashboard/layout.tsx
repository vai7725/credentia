import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-[100vh] flex justify-center items-center bg-gray-100">
      {children}
    </div>
  );
};

export default Layout;
