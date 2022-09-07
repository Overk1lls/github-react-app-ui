import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isSignedIn } from "../app/auth";
import { useLazyGetCurrentUserQuery } from "../features/user/userAPI";
import { User } from "../models/user";
import Navbar from "../components/Navbar";
import RepositoryList from "../components/RepositoryList";
import CommitsTable from "../components/CommitsTable";

export default function HomePage() {
  const [user, setUser] = useState<User>();
  const [org, setOrg] = useState('');
  const [repo, setRepo] = useState('');
  const [triggerUserQuery] = useLazyGetCurrentUserQuery({ refetchOnReconnect: true });

  useEffect(() => {
    triggerUserQuery(undefined, true)
      .then(({ data }) => setUser(data))
      .catch(console.error);
  }, [triggerUserQuery]);

  return (
    isSignedIn()
      ? <>
        {user && <Navbar user={user} />}

        <RepositoryList
          setRepoName={setRepo}
          setOrgName={setOrg}
        />

        <CommitsTable org={org} repo={repo} />
      </>
      : <Navigate to="/" />
  );
}

