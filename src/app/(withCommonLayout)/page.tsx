import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/AuthServices";


const HomePage = async () => {
  const user = await getCurrentUser();
  console.log(user)
  return (
    <div>
      <h1>Wellcome to nextmart home page</h1>
      <Button>click me</Button>

    </div>
  );
};

export default HomePage;