import { Suspense, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUserServicesRequest } from "../api/services.api";
import Spinner from "../components/Spinner";
import UserDashboard from "../components/UserDashboard";

function ProfilePage() {
  const { user } = useAuth();
  const [userServices, setUserServices] = useState();
  useEffect(() => {
    getAllUserServicesRequest()
      .then((response) => {
        setUserServices(response.data);
      })
      .catch((err) => console.log(err));
  }, [user.user_id]);

  if (userServices) {
    return (
      <Suspense
        fallback={
          <div className="text-center min-h-screen">
            <Spinner />
          </div>
        }
      >
        <UserDashboard user={user} userServices={userServices} />
      </Suspense>
    );
  }
}

export default ProfilePage;
