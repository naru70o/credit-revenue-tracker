import { SignIn } from '@clerk/nextjs'

export default function page() {
  return (
    <div className="grid grid-cols-1 justify-center content-center h-screen w-full">
      <div role="status" className="w-full flex justify-center">
        <SignIn />;
      </div>
    </div>
  );
}