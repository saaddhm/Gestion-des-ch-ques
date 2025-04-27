import { Route, useLocation } from "wouter";

interface PrivateRouteProps {
  path: string;
  component: any;
}

const PrivateRoute = ({ path, component }: PrivateRouteProps) => {
  const [location, setLocation] = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    setLocation("/"); // 👈 Redirige vers login
    return null;
  }

  return <Route path={path} component={component} />;
};

export default PrivateRoute;
