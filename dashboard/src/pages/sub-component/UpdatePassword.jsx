import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  updatePassword
} from "@/store/slices/passwordSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { error, isUpdated, loading, message } = useSelector(
    (state) => state.password
  );

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputPassword = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordInfo;

    dispatch(updatePassword({ currentPassword, newPassword, confirmNewPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error || "Provide valid password!");
    }
    if (isUpdated) {
      toast.success(message || "Password updated!");
      setPasswordInfo({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [error, isUpdated, message]);

  return (
    <div className="w-full h-full">
      <div className="grid w-[70%] gap-6">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold">Update Password</h2>
        </div>
        <div className="grid gap-6 mr-8">
          <div className="grid gap-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              placeholder="************"
              name="currentPassword"
              value={passwordInfo.currentPassword}
              onChange={handleInputPassword}
            />
          </div>
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="************"
              name="newPassword"
              value={passwordInfo.newPassword}
              onChange={handleInputPassword}
            />
          </div>
          <div className="grid gap-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="************"
              name="confirmNewPassword"
              value={passwordInfo.confirmNewPassword}
              onChange={handleInputPassword}
            />
          </div>
          <div className="grid gap-2">
            {!loading ? (
              <Button onClick={handleUpdatePassword}>Update Password</Button>
            ) : (
              <LoadingButton content="Loading..." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
