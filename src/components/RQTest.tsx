import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

function RQTest() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>RQTest Page</h2>
      {data.map((user) => {
        return <div key={user.name}>{user.name}</div>;
      })}
    </div>
  );
}

export default RQTest;
