import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "./LoadingButton";
import { FileImage } from "lucide-react";
import { addNewProject } from "@/store/slices/projectSlice";

const AddProject = () => {
  const initialProjectInfo = {
    title: "",
    technologies: "",
    stack: "",
    deployed: "",
    githubLink: "",
    projectLink: "",
    description: "",
    banner: "",
  };

  const stacks = ["MERN", "MEAN", "MEVN", "Django", "LAMP", "LEMP"];
  const [projectInfo, setProjectInfo] = useState(initialProjectInfo);
  const [bannerPreview, setBannerPreview] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.project);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBannerPreview(reader.result);
        setProjectInfo((prev) => ({ ...prev, banner: file }));
      };
    }
  };

  const handleAddNewProject = (e) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "technologies",
      "stack",
      "deployed",
      "githubLink",
      "projectLink",
      "description",
    ];
    for (const field of requiredFields) {
      if (!projectInfo[field]) {
        toast.error("Provide all details about the project!");
        return;
      }
    }

    const submissionData = new FormData();
    Object.keys(projectInfo).forEach((key) =>
      submissionData.append(key, projectInfo[key])
    );

    dispatch(addNewProject(submissionData));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message) {
      toast.success(message);
      setProjectInfo(initialProjectInfo);
    }
  }, [error, message]);

  return (
    <div className="flex justify-center items-center max-h-fit sm:gap-4 sm:py-4 sm:pl-14">
      <form
        className="w-full px-5 py-4 md:w-[850px]"
        onSubmit={handleAddNewProject}
      >
        <h2 className="text-2xl font-bold">Add New Project</h2>
        <div className="space-y-6 mt-6">
          <div className="w-full">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Education Management System"
              value={projectInfo.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <Label>Technologies Used</Label>
            <Input
              type="text"
              name="technologies"
              placeholder="HTML, CSS, JavaScript, React"
              value={projectInfo.technologies}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full">
              <Label>Stack</Label>
              <select
                name="stack"
                value={projectInfo.stack}
                onChange={handleInputChange}
                className="block w-full rounded-md py-2 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Stack</option>
                {stacks.map((stack, index) => (
                  <option value={stack} key={index}>
                    {stack}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <Label>Is Project Deployed?</Label>
              <select
                name="deployed"
                value={projectInfo.deployed}
                onChange={handleInputChange}
                className="block w-full rounded-md py-2 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full">
              <Label>GitHub Link</Label>
              <Input
                type="text"
                name="githubLink"
                placeholder="https://github.com/"
                value={projectInfo.githubLink}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <Label>Project Link</Label>
              <Input
                type="text"
                name="projectLink"
                placeholder="https://myproject.com/"
                value={projectInfo.projectLink}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Project description"
              value={projectInfo.description}
              onChange={handleInputChange}
              aria-label="Description"
            />
          </div>

          <div className="w-full">
            <Label>Project Banner</Label>
            <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3">
              <div className="text-center">
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Project Banner Preview"
                    className="mx-auto h-[180px] w-full object-cover rounded-sm"
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
                    <span>Upload a Banner</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-end gap-x-6">
            {loading ? (
              <LoadingButton content="Submitting" />
            ) : (
              <Button type="submit" className="w-full">
                Add Project
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
