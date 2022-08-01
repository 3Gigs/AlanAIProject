import Login from "../Login/Login";

interface Props {
    // eslint-disable-next-line no-undef
    RouteComponent: React.ComponentType;
    path?: string;
}

function PrivateRoute ({ RouteComponent }: Props) {
  const isAuth = !!sessionStorage.getItem("AlanAIAuthToken");

  if (isAuth) {
    alert(isAuth);
    return <RouteComponent />;
  } else {
    return <Login />;
  }
}

export default PrivateRoute;
