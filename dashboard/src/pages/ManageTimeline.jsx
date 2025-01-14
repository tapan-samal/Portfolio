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
import { Tabs } from "@/components/ui/tabs";
import { deleteTimeline, getAllTimelines } from "@/store/slices/timelineSlice";
import { TabsContent } from "@radix-ui/react-tabs";
import { PencilLine, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageTimeline = () => {
  const dispatch = useDispatch();
  const { timelines, error, message } = useSelector((state) => state.timeline);

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(getAllTimelines());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Link to={"/home"}>
                <Button className="w-fit">Back to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">
                      Academy/University
                    </TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timelines && timelines.length > 0 ? (
                    timelines
                      .slice() // Create a shallow copy to avoid mutating the original array
                      .sort(
                        (a, b) =>
                          new Date(b.timeline.from) - new Date(a.timeline.from)
                      ) // Sort by ascending "from" year
                      .map((element) => (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell className="font-medium">
                            {element.title}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.description || "Not provided."}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.timeline.from}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.timeline.to ? element.timeline.to : "__"}
                          </TableCell>
                          <TableCell className="flex justify-center gap-6">
                            <button className="border-2 rounded-full h-7 w-7 flex justify-center items-center text-green-600 hover:text-slate-50 hover:bg-green-600">
                              <PencilLine className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTimeline(element._id)}
                              className="border-2 rounded-full h-7 w-7 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow className="text-2xl">
                      <TableCell colSpan={5} className="text-center">
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
  );
};

export default ManageTimeline;
