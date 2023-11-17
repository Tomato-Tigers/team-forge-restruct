import MainLayout from "./MainLayout";

interface User {
  name: string;
  email: string;
}

interface HomeProps {
  user: User;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div>Home Page</div>;
    </MainLayout>
  );
};

export default Home;
