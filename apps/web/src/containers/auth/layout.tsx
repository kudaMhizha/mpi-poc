import {Outlet} from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex flex-row justify-center items-center h-screen w-full">
      <div className="flex items-center h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
