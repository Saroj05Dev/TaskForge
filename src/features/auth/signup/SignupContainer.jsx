import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupPresenter from "./SignupPresenter";
import { signupUser } from "./signupSlice";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.signup
  );

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSignup = (formData) => {
    dispatch(signupUser(formData));
  };

  // Auto redirect after signup + auto-login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <SignupPresenter
      onSubmit={handleSignup}
      loading={loading}
      error={error}
    />
  );
};

export default SignupContainer;
