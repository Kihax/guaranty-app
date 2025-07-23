import "../globals.css";
import { cookies } from 'next/headers'


export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;

  console.log("Token in Dashboard:", token);

  if (!token) {
    
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
