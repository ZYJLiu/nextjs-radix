import AuthButton from "./auth-button";

export default async function Navbar() {
  return (
    <nav className="flex justify-end items-center w-full p-2">
      <AuthButton />
    </nav>
  );
}
