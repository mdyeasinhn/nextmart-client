"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";



const HomePage = () => {
const user = useUser();
console.log(user);
  return (
    <div>
      <h1>Wellcome to nextmart home page</h1>
      <Button>click me</Button>

    </div>
  );
};

export default HomePage;