import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, message, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error || "Login failed!");
    }
    if(message && !isAuthenticated) {
      toast.success(message || "Logout successful!");
      navigate("/");
    }
  }, [isAuthenticated, message, error]);

  return (
    <>
      <div>Dashboard</div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Dashboard;
