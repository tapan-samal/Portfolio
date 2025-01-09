import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearUserError,
  clearUserMessage,
  getProfile,
  userLogout
} from "@/store/slices/userSlice";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Account from "./sub-component/Account";
import AddApplicationTool from "./sub-component/AddApplicationTool";
import AddProject from "./sub-component/AddProject";
import AddSkill from "./sub-component/AddSkill";
import AddTimeline from "./sub-component/AddTimeline";
import Dashboard from "./sub-component/Dashboard";
import Messages from "./sub-component/Messages";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, message, error, user } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
    if (message && !isAuthenticated) {
      toast.success(message || "Logout successful!");
      navigate("/");
      dispatch(clearUserMessage());
    }
  }, [message, error]);

  const renderActiveComponent = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />;
      case "Add Project":
        return <AddProject />;
      case "Add Skill":
        return <AddSkill />;
      case "Add Tool":
        return <AddApplicationTool />;
      case "Add Timeline":
        return <AddTimeline />;
      case "Messages":
        return <Messages />;
      case "Account":
        return <Account />;
      default:
        return <Dashboard />;
    }
  };

  const navigationItems = [
    { name: "Dashboard", icon: Home },
    { name: "Add Project", icon: FolderGit },
    { name: "Add Skill", icon: PencilRuler },
    { name: "Add Tool", icon: LayoutGrid },
    { name: "Add Timeline", icon: History },
    { name: "Messages", icon: MessageSquareMore },
    { name: "Account", icon: User },
  ];

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 hidden w-16 flex-col border-r bg-background sm:flex z-50">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              {/* <span className="sr-only">Portfolio</span> */}
            </Link>
            {navigationItems.map((item) => (
              <TooltipProvider key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        active === item.name
                          ? "text-accent-foreground bg-accent"
                          : "text-muted-foreground"
                      } transition-colors hover:text-foreground md:h-8 md:w-8`}
                      onClick={() => setActive(item.name)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-6 w-6" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-6 w-6" />
                {/* <span className="sr-only">Toggle Menu</span> */}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[248px] sm:max-w-xs">
              <SheetTitle>
                <Link className="group mb-4 ml-2 flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                  <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                </Link>
              </SheetTitle>
              <nav className="grid gap-6 text-lg font-medium">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    className={`flex items-center gap-4 px-2.5 ${
                      active === item.name
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActive(item.name)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <Link
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="h- w-6" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
            <img
              src={user?.avatar?.url}
              alt="avatar"
              className="w-16 h-16 rounded-full max-[500px]:hidden"
            />
            <h1 className="text-4xl max-[900px]:text-2xl">
              Welcome, {user?.fullName}
            </h1>
          </div>
        </header>
        {renderActiveComponent()}
      </div>
    </>
  );
};

export default HomePage;
