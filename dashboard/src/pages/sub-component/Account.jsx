import React, { useState } from "react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  const renderActiveComponent = () => {
    switch (selectedComponent) {
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-full">
      <main className="flex flex-1 flex-col gap-4 min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 p-4 md:gap-8 sm:pl-20">
        <div className="mx-auto grid max-w-6xl w-full gap-2">
          <h2 className="text-3xl font-semibold">Settings</h2>
        </div>
        <div className="mx-auto grid max-w-6xl w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          {/* Navigation */}
          <nav className="grid gap-4 text-base text-muted-foreground">
            {["Profile", "Update Profile", "Update Password"].map((item) => (
              <button
                key={item}
                className={`text-left ${
                  selectedComponent === item
                    ? "font-semibold text-primary"
                    : "hover:text-primary"
                }`}
                onClick={() => setSelectedComponent(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          {/* Render Active Component */}
          <div className="grid gap-6">{renderActiveComponent()}</div>
        </div>
      </main>
    </div>
  );
};

export default Account;
