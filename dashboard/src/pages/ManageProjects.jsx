import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearProjectError,
  clearProjectMessage,
  deleteProject,
  getAllProjects,
} from "@/store/slices/projectSlice";
import { Eye, Pen, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const dispatch = useDispatch();
  const { projects, message, error } = useSelector((state) => state.project);

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
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
  }, [message, error]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Projects</CardTitle>
              <Link to={"/home"}>
                <Button className="w-fit">Back to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stack
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Deployed
                    </TableHead>
                    <TableHead className="md:table-cell">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell>
                            <div className="font-medium">
                              <img
                                src={element.banner && element.banner.url}
                                alt={element.title}
                                className="w-20 h-16 rounded-sm"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{element.title}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.stack}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.deployed}
                          </TableCell>
                          <TableCell className="flex flex-row items-center gap-5 h-24">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/view/project/${element._id}`}>
                                    <button
                                      className="border-green-600 border-2 rounded-full h-7 w-6 flex 
                                  justify-center items-center text-green-600  hover:text-slate-100 
                                  hover:bg-green-600"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  View
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/update/project/${element._id}`}>
                                    <button className="border-blue-700 border-2 rounded-full h-7 w-6 flex justify-center items-center text-blue-700  hover:text-slate-100 hover:bg-blue-700">
                                      <Pen className="h-4 w-4" />
                                    </button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  Edit
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className="border-red-600 border-2 rounded-full h-7 w-6 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                                    onClick={() =>
                                      handleDeleteProject(element._id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  Delete
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell className="text-2xl">
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
    </div>
  );
};

export default ManageProjects;
