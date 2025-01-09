import { Button } from "@/components/ui/button";
import { getProjectById } from "@/store/slices/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ViewProject = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { project } = useSelector((state) => state.project);

  const technologiesList = project.technologies?.split(", ") || [];
  const descriptionList = project.description?.split(", ") || [];

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch]);

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-6">
            <div className="flex justify-end">
              <Link to={"/manage/projects"}>
                <Button>Back to Lists</Button>
              </Link>
            </div>
            <div className="mt-1 flex flex-col gap-5">
              <div className="w-full">
                <h1 className="text-2xl font-semibold mb-4">{project.title}</h1>
                <img
                  src={project.banner ? project.banner.url : "Loading image..."}
                  alt="Project Banner"
                  className="w-full max-h-96 object-cover rounded-md"
                />
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold mb-2">Technologies</p>
                <ul className="list-inside flex flex-wrap gap-4">
                  {technologiesList.map((item, index) => (
                    <>
                      <li
                        key={index}
                        className="w-full sm:w-auto before:content-['▪'] before:mr-2 before:text-black"
                      >
                        {item}
                      </li>
                    </>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold mb-2">Description</p>
                <ul className="list-inside flex flex-wrap gap-4">
                  {descriptionList.map((item, index) => (
                    <>
                      <li
                        key={index}
                        className="w-full sm:w-auto before:content-['▪'] before:mr-2 before:text-black"
                      >
                        {item}
                      </li>
                    </>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold mb-2">Tech Stack</p>
                <p>{project.stack}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold mb-2">Deployed</p>
                <p>{project.deployed}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold mb-2">
                  Github Link
                </p>
                <Link
                  className="text-sky-700"
                  target="_blank"
                  to={project.githubLink}
                >
                  {project.githubLink}
                </Link>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold mb-2">Project Link</p>
                <Link className="text-sky-700" target="_blank">
                  {project.projectLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
