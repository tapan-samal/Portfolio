import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateProject,
  getProjectById,
  clearProjectMessage,
  clearProjectError,
} from "@/store/slices/projectSlice";
import LoadingButton from "./sub-component/LoadingButton";
import { Link, useParams } from "react-router-dom";

const UpdateProject = () => {
  const [bannerPreview, setBannerPreview] = useState("");
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    technologies: "",
    stack: "",
    deployed: "",
    githubLink: "",
    projectLink: "",
    description: "",
    banner: "/avatar.jpeg",
  });
  const dispatch = useDispatch();
  const { id } = useParams();

  const { project, loading, message, error } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (project) {
      setProjectInfo({
        title: project?.title || "",
        technologies: project?.technologies || "",
        stack: project?.stack || "",
        deployed: project?.deployed || "",
        githubLink: project?.githubLink || "",
        projectLink: project?.projectLink || "",
        description: project?.description || "",
        banner: project?.banner?.url || "/avatar.jpeg",
        bannerPreview: project?.banner?.url || "/avatar.jpeg",
      });
      setBannerPreview(project?.banner?.url || "/avatar.jpeg");
    }
  }, [project]);

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

  const handleUpdateProject = (e) => {
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
        toast.error(`Please provide the project ${field}!`);
        return;
      }
    }

    const submissionData = new FormData();
    Object.keys(projectInfo).forEach((key) =>
      submissionData.append(key, projectInfo[key])
    );

    dispatch(updateProject({ id, updateData: submissionData }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProjectError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearProjectMessage());
    }
  }, [error, message]);

  const stacks = ["MERN", "MEAN", "MEVN", "Django", "LAMP", "LEMP"];

  return (
    <div className="flex justify-center items-center max-h-fit sm:gap-4 sm:py-4 sm:pl-14">
      <form
        className="w-full px-5 py-4 md:w-[850px]"
        onSubmit={handleUpdateProject}
      >
        <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
          <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
            UPDATE PROJECT
          </h2>
          <Link to={"/manage/projects"}>
            <Button>Back to Lists</Button>
          </Link>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <div className="w-full sm:col-span-4">
            <img
              src={bannerPreview ? bannerPreview : "/avatar.jpeg"}
              alt="projectBanner"
              className="w-full max-h-96 object-cover rounded-md"
            />
            <div className="relative">
              <input
                type="file"
                onChange={handleFileUpload}
                className="avatar-update-btn mt-4 w-full"
              />
            </div>
          </div>
        </div>
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
              placeholder="Project description..."
              value={projectInfo.description}
              onChange={handleInputChange}
              aria-label="Description"
            />
          </div>
          <div className="mt-10 flex items-center justify-end gap-x-6">
            {loading ? (
              <LoadingButton content="Updating" />
            ) : (
              <Button type="submit" className="w-full">
                Update Project
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
