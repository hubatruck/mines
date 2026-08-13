import { Navigate } from 'react-router';

const FallbackRoute = () => {
  return (
    <>
      <Navigate to="/" replace />
      <span>Please wait...</span>
    </>
  );
};

export default FallbackRoute;
