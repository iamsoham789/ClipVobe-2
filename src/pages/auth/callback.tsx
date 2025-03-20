
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error during auth callback:', error.message);
        navigate('/auth?error=Unable to verify email');
      } else {
        navigate('/dashboard');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-clipvobe-dark flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-clipvobe-cyan mx-auto mb-4"></div>
        <p>Verifying your email...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
