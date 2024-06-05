import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-[#151515] h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
