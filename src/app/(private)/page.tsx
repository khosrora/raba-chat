import { connectToMongodb } from "@/config/db.config";

connectToMongodb();

export default async function Home() {
  return (
    <div className="p-5">
      <h1 className="text-xs">home page</h1>
    </div>
  );
}
