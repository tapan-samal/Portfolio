import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearSkillError,
  clearSkillMessage,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from "@/store/slices/skillSlice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSkills = () => {
  const dispatch = useDispatch();
  const { skills, error, message } = useSelector((state) => state.skill);
  const [newProficiency, setNewProficiency] = useState({});

  const handleInputChange = (e, skillId) => {
    setNewProficiency((prev) => ({ ...prev, [skillId]: e.target.value }));
  };

  const handleUpdateSkill = (id) => {
    const proficiency = newProficiency[id];
    if (proficiency) {
      dispatch(updateSkill({ id, proficiency }));
    }
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSkillError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearSkillMessage());
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage your Skills</CardTitle>
              <Link to={"/home"}>
                <Button className="w-fit">Back to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4">
              {skills && skills.length > 0 ? (
                skills.map((skill) => (
                  <Card key={skill._id}>
                    <CardHeader className="text-xl font-bold flex flex-row justify-between items-center">
                      {skill.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(skill._id)}
                              className="border-2 rounded-full h-6 w-5 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            {" "}
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter>
                      <Label className="text-lg mr-2">Proficiency:</Label>
                      <Input
                        type="number"
                        defaultValue={`${skill.proficiency}`}
                        onChange={(e) => handleInputChange(e, skill._id)}
                        onBlur={() => handleUpdateSkill(skill._id)}
                      />
                      <span className="ml-2">%</span>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="flex w-full justify-center items-center">
                  <CardTitle className="text-center">
                    You have not added any skill.
                  </CardTitle>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
