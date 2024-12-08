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
import { userLogin } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const handleSubmitBtn = () => {
    dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error || "Login failed!");
    }
    if (isAuthenticated) {
      navigate("/dashboard");
      toast.success(message || "Login successful!");
    }
  }, [error, message, isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={email}
                placeholder="tapan@google.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                value={password}
                type="password"
                placeholder="*************"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              onClick={handleSubmitBtn}
              disabled={loading}
              className="w-full tracking-widest text-base"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Link
              to="/password/forgot"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            *Only admin is allowed to access the portfolio dashboard.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
