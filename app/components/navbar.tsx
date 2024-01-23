import { SignInButton } from "./sign-in-button";

export default function Navbar() {
  return (
    <nav className="flex justify-end items-center w-full p-2">
      <SignInButton />
    </nav>
  );
}
