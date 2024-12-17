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
import { forgotPassword } from "@/store/slices/passwordSlice";
import { ChevronsLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./sub-component/LoadingButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.password);

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     setEmail("");
  //   }
  //   if (message) {
  //     toast.success(message);
  //     setEmail("");
  //   }
  // }, [error, message]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-slate-700">
      <Card className="mx-auto max-w-sm">
        <div className="flex items-center justify-center">
          <img src="/password.jpg" alt="Logo" className="w-[33%] h-auto" />
        </div>
        <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a link to reset your password!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                placeholder="tapan@google.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {!loading ? (
              <Button
                type="submit"
                onClick={handleForgotPassword}
                className="w-full tracking-widest text-base mt-2"
              >
                Submit
              </Button>
            ) : (
              <LoadingButton content="Sending..." />
            )}
            <div className="flex items-center justify-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronsLeft className="mr-1" /> Back to Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
