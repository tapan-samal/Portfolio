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
import { clearUserError, clearUserMessage, userLogin } from "@/store/slices/userSlice";
import { ChevronsLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./sub-component/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.user);

  const handleSubmitBtn = () => {
    dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
    if (message) {
      navigate("/home");
      toast.success(message || "Login successful!");
      setEmail("");
      setPassword("");
      dispatch(clearUserMessage())
    }
  }, [error, message]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-slate-700">
      <Card className="mx-auto max-w-sm px-4">
        <div className="flex items-center justify-center">
          <img src="/password.jpg" alt="Logo" className="w-[33%] h-auto" />
        </div>
        <CardHeader className="p-3">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password for login!
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
            {!loading ? (
              <Button
                type="submit"
                onClick={handleSubmitBtn}
                className="w-full tracking-widest text-base"
              >
                Login
              </Button>
            ) : (
              <LoadingButton content="Verifying" />
            )}
            <div className="flex items-center justify-center">
              <Link
                to="/password/forgot"
                className="inline-flex items-center text-sm text-gray-700 hover:text-gray-950 transition-colors"
              >
                <ChevronsLeft className="mr-1" /> Forgot your password?
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            *Only admin is allowed to access dashboard!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
