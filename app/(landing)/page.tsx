import { Button } from "@/components/ui/button";
import Link from "next/Link";

export default function Landing() {
  return (
  <>
    <p className="text-2xl text-green-500">Landing Page</p>
    <Link href='/login'><Button className="bg-blue-600">Login</Button></Link>
    <Link href='/signup'><Button className="bg-blue-600">Register</Button></Link>
  </>
  );
}
