import {GoogleLogo} from '@phosphor-icons/react';
import {Button} from '@mpi-app/ui';

export const SocialAuth = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        asChild
        size="lg"
        className="w-full !bg-[#4285F4] !text-white hover:!bg-[#4285F4]/80"
      >
        <a href="/api/auth/google">
          <GoogleLogo className="mr-3 h-4 w-4" />
          Google
        </a>
      </Button>
    </div>
  );
};
