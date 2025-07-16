import React, { useState, useRef, useEffect } from "react";
import { SlBell } from "react-icons/sl";
import { PiDotOutlineFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: "New Application Received", time: "2 mins ago", unread: true },
    { id: 2, title: "Interview Scheduled", time: "1 hour ago", unread: false },
    { id: 3, title: "Job Closed", time: "Yesterday", unread: true },
    { id: 4, title: "Job Published", time: "2 days ago", unread: false },
    { id: 5, title: "New User Registered", time: "3 days ago", unread: true },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;
  const visibleNotifications = notifications.slice(0, 3);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-muted cursor-pointer transition"
      >
        <SlBell className="text-gray-900 dark:text-gray-100 text-lg" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 left-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-xl shadow-xl z-50 border dark:border-zinc-700 animate-fade-in-down">
          <div className="p-4 border-b dark:border-zinc-700">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              🔔 Notifications
            </h3>
          </div>

          <div className="px-4 py-2 flex flex-col gap-3">
            {visibleNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-2 p-2 rounded-md transition ${
                  notif.unread ? "bg-muted hover:bg-muted/80" : "hover:bg-muted/60"
                }`}
              >
                <PiDotOutlineFill
                  size={18}
                  className={`mt-1 ${
                    notif.unread ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {notif.title}
                  </p>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t dark:border-zinc-700 text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 dark:text-blue-400 hover:bg-transparent text-sm"
              onClick={() => {
                setOpen(false);
                navigate("/notifications");
              }}
            >
              View All Notifications →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;