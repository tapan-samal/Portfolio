import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resetUpdateState, updateProfile } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    aboutMe: user?.aboutMe || "",
    portfolioUrl: user?.portfolioUrl || "",
    linkedinUrl: user?.linkedinUrl || "",
    githubUrl: user?.githubUrl || "",
    twitterUrl: user?.twitterUrl || "",
    instagramUrl: user?.instagramUrl || "",
    facebookUrl: user?.facebookUrl || "",
    avatar: null,
    resume: null,
    avatarPreview: user?.avatar?.url || "./staticAvatar.jpg",
    resumePreview: user?.resume?.url || "./staticResume.jpg",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        [`${fileType}Preview`]: reader.result,
        [fileType]: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "avatarPreview" && key !== "resumePreview") {
        data.append(key, formData[key]);
      }
    });
    dispatch(updateProfile(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error || "An error occurred while updating the profile.");
    }
    if (isUpdated) {
      dispatch(resetUpdateState());
      toast.success(message || "Profile updated successfully!");
    }
  }, [isUpdated, message]);

  return (
    <div className="w-full h-full">
      <div className="grid w-[90%] gap-6">
        <h2 className="text-3xl font-bold">Update Profile</h2>
        <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-4 mb-5">
          {/* Avatar Upload */}
          <div className="grid gap-2 w-full sm:w-72">
            <Label>Profile Image</Label>
            <img
              src={formData.avatarPreview}
              alt="Avatar"
              className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
            />
            <input
              type="file"
              className="avatar-update-btn"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "avatar")}
            />
          </div>
          {/* Resume Upload */}
          <div className="grid gap-2 w-full sm:w-72">
            <Label>Resume</Label>
            {formData.resumePreview?.endsWith(".pdf") ? (
              <iframe
                src={formData.resumePreview}
                title="Resume Preview"
                className="w-full h-72 sm:h-96 rounded-2xl"
              />
            ) : (
              <Link to={formData.resumePreview} target="_blank">
                <img
                  src={formData.resumePreview}
                  alt="Resume"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </Link>
            )}
            <input
              type="file"
              className="avatar-update-btn"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, "resume")}
            />
          </div>
        </div>

        {/* Form Fields */}
        {[
          { label: "Full Name", name: "fullName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "About Me", name: "aboutMe", component: "textarea" },
          { label: "Portfolio URL", name: "portfolioUrl", type: "text" },
          { label: "GitHub URL", name: "githubUrl", type: "text" },
          { label: "Linkedin URL", name: "linkedinUrl", type: "text" },
          { label: "Twitter URL", name: "twitterUrl", type: "text" },
          { label: "Instagram URL", name: "instagramUrl", type: "text" },
          { label: "Facebook URL", name: "facebookUrl", type: "text" },
        ].map(({ label, name, type, component }) => (
          <div key={name} className="grid gap-2">
            <Label>{label}</Label>
            {component === "textarea" ? (
              <Textarea
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
              />
            ) : (
              <Input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="grid gap-2">
          {!loading ? (
            <Button
              onClick={handleUpdateProfile}
              className="text-lg tracking-wide w-full"
            >
              Update Profile
            </Button>
          ) : (
            <LoadingButton content="Updating..." />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
