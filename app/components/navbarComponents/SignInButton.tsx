"use client"

import { useRouter } from "next/navigation";
import { useUser } from "../../context/user";



const Home: React.FC = () => {
    const { user, signIn, signOut } = useUser();
    const router = useRouter();
    console.log(user)

  const handleButtonClick = async () => {
    // If someone is signed in, sign them out
    if (user) {
      try {
        await signOut();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    } else {
      // If no one is signed in, initiate the sign-in process
      try {
        // Replace with your actual sign-in logic (e.g., using a modal or redirect)
        router.push("/auth")
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <div>
      {/* Your other page content goes here */}

      <button onClick={handleButtonClick} className="bg-white text-blue-500 px-4 py-2 rounded-full">
        {user ? "Sign Out" : "Administrator"}
      </button>
    </div>
  );
};

export default Home;
