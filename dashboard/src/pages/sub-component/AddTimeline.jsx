import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewTimeline } from "@/store/slices/timelineSlice";

const AddTimeline = () => {
  const initialTimeline = {
    title: "",
    description: "",
    timeline: {
      from: "",
      to: "",
    },
  };
  const [timelineInfo, setTimelineInfo] = useState(initialTimeline);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.timeline);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["from", "to"].includes(name)) {
      setTimelineInfo((prev) => ({
        ...prev,
        timeline: { ...prev.timeline, [name]: value },
      }));
    } else {
      setTimelineInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    dispatch(addNewTimeline(timelineInfo));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      setTimelineInfo(initialTimeline);
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center max-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        className="w-[100%] px-5 py-4 md:w-[650px]"
        onSubmit={handleAddNewTimeline}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Add Timeline</h2>
          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="w-full sm:col-span-4">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </Label>
              <Input
                type="text"
                placeholder="Degree"
                name="title"
                value={timelineInfo.title}
                onChange={handleInputChange}
                aria-label="Title"
              />
            </div>

            {/* Description */}
            <div className="w-full sm:col-span-4">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </Label>
              <Textarea
                placeholder="Description"
                name="description"
                value={timelineInfo.description}
                onChange={handleInputChange}
                aria-label="Description"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* From Year */}
              <div className="flex-1">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Starting From (Year)
                </Label>
                <Input
                  type="number"
                  placeholder="From"
                  name="from"
                  value={timelineInfo.timeline.from}
                  onChange={handleInputChange}
                  aria-label="Starting From Year"
                />
              </div>

              {/* To Year */}
              <div className="flex-1">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Ending To (Year)
                </Label>
                <Input
                  type="number"
                  placeholder="To"
                  name="to"
                  value={timelineInfo.timeline.to}
                  onChange={handleInputChange}
                  aria-label="Ending To Year"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button type="submit" className="w-full">
              Add Timeline
            </Button>
          ) : (
            <LoadingButton content="Adding..." />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
