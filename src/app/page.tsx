import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  // const { firstName, lastName, username }: any = await currentUser();
  return (
    <div className="p-10">
      <UserButton afterSignOutUrl={"/sign-in"} />
      <div className="flex flex-col gap-3">
        {/* <span>firstName : {firstName}</span>
        <span>lastName : {lastName}</span>
        <span>userName : {username}</span> */}
      </div>
    </div>
  );
}
