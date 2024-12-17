import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { addNewSkill, clearAllSkillError } from "@/store/slices/skillSlice";
import { toast } from "react-toastify";
import { FileImage } from "lucide-react";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.skill);

  const handleIcon = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB!");
        return;
      }

      const allowedFileTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error("Unsupported file type!");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIcon(file);
    }
  };

  const handleAddNewSkill = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("icon", icon);

    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillError());
    }
    if (message) {
      toast.success(message);
      setTitle("");
      setProficiency("");
      setIcon(null);
      setIconPreview("");
    }
  }, [loading, message, error]);

  return (
    <div className="flex justify-center items-center max-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        className="w-full px-5 py-4 md:w-[600px]"
        onSubmit={handleAddNewSkill}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Add New Skill</h2>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </Label>
              <Input
                type="text"
                placeholder="React"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Proficiency
              </Label>
              <Input
                type="number"
                placeholder="80"
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
              />
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="file-upload"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Skill Icon
              </Label>
              <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3">
                <div className="text-center">
                  {iconPreview ? (
                    <img
                      src={iconPreview}
                      alt="Skill Icon Preview"
                      className="mx-auto h-12 w-12 object-cover"
                    />
                  ) : (
                    <FileImage
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-300"
                    />
                  )}
                  <div className="mt-4 flex justify-center text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleIcon}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-end gap-x-6">
          {loading ? (
            <LoadingButton content="Submitting..." />
          ) : (
            <Button type="submit" className="w-full">
              Add Skill
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
