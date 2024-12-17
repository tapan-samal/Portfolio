import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import LoadingButton from "./sub-component/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "@/store/slices/passwordSlice";
import { toast } from "react-toastify";
import { ChevronsLeft } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { loading, error, message } = useSelector((state) => state.password);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleResetPassword = () => {
    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      navigate("/");
    }
  }, [error, message]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-slate-700">
      <Card className="mx-auto max-w-sm">
        <div className="flex items-center justify-center">
          <img
            src="/password.jpg"
            alt="Logo"
            className="w-[25%] h-auto"
          />
        </div>
        <CardHeader className="flex flex-col items-center justify-center text-center gap-2 py-1">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter a new password to reset your existing password!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>New Password</Label>
              <Input
                type="password"
                value={password}
                placeholder="************"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                placeholder="************"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {!loading ? (
              <Button
                type="submit"
                onClick={handleResetPassword}
                className="w-full tracking-widest text-base mt-2"
              >
                Reset Password
              </Button>
            ) : (
              <LoadingButton content="Resetting..." />
            )}
          </div>
          <div className="flex items-center justify-center mt-4">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronsLeft className="mr-1" /> Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
