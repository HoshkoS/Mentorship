import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("_backend_session") == null) {
      navigate("/login");
    }
  });

  return (
    <>
      {props.children}
    </>
  )
}
