import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/store/slices/projectSlice";
import { getAllSkills } from "@/store/slices/skillSlice";
import {
  clearMessage,
  deleteApplicationTool,
  getAllApplicationTools,
} from "@/store/slices/applicationToolSlice";
import { getAllTimelines } from "@/store/slices/timelineSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const {
    applicationTools,
    loading: appLoading,
    message: appMessage,
    error: appError,
  } = useSelector((state) => state.applicationTool);

  const { timelines } = useSelector((state) => state.timeline);

  const [appId, setAppId] = useState(null);

  const dispatch = useDispatch();

  const handleDeleteAppTool = (id) => {
    setAppId(id);
    dispatch(deleteApplicationTool(id));
  };

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllSkills());
    dispatch(getAllApplicationTools());
    dispatch(getAllTimelines());
  }, [dispatch]);

  useEffect(() => {
    if (appError) toast.error(appError);
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(clearMessage());
    }
  });

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Visit Portfolio</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-5xl">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to={"/manage/projects"}>
                    <Button>Manage Projects</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skill Set</CardTitle>
                  <CardTitle className="text-5xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to={"/manage/skills"}>
                    <Button>Manage Skill</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-center pr-5">
                            Visit
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.deployed.toUpperCase()}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Link
                                    to={`/view/project/${element._id}`}
                                    target="_blank"
                                  >
                                    <Button>Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-2xl overflow-y-hidden">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Skill Set</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card key={element._id}>
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter>
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-2xl">You have not added any skill.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Application Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applicationTools && applicationTools.length > 0 ? (
                          applicationTools.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-7 h-7"
                                    src={element.icon && element.icon.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell  text-center">
                                  {appLoading && appId === element._id ? (
                                    <LoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteAppTool(element._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-2xl overflow-y-hidden">
                              You have not added any skill.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage/timeline"}>
                      <Button className="w-fit">Manage Timelines</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-center">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timelines && timelines.length > 0 ? (
                          timelines.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-center">
                                  {element.timeline.to}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-2xl overflow-y-hidden">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
