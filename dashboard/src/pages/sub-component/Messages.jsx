import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteMessage, getAllMessages } from "@/store/slices/messageSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, message, loading, error } = useSelector(
    (state) => state.message
  );

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-16 mx-4">
      <Card>
        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          {messages && messages.length > 0 ? (
            messages.map((element) => {
              return (
                <Card key={element._id} className="grid gap-2 p-5">
                  <CardDescription className="text-slate-950">
                    <span className="font-bold mr-2">Sender Name:</span>
                    {element.senderName}
                  </CardDescription>
                  <CardDescription className="text-slate-950">
                    <span className="font-bold mr-2">Subject:</span>
                    {element.subject}
                  </CardDescription>
                  <CardDescription className="text-slate-950">
                    <span className="font-bold mr-2">Message:</span>
                    {element.message}
                  </CardDescription>
                  <CardFooter className="justify-end">
                    {loading ? (
                      <LoadingButton content={"Deleting..."} width={"w-32"} />
                    ) : (
                      <Button
                        className="w-20 h-9 tracking-widest"
                        onClick={() => handleDeleteMessage(element._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <CardHeader className="text-2xl">No Messages Found!</CardHeader>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
