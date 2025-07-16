// src/pages/jobManagement/ViewJob.jsx
import React from "react";

const ViewJob = ({ job }) => {
  return (
    <div className="p-4 max-h-[80vh] overflow-y-auto w-full overflow-x-auto">
      <div className="min-w-[600px] grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Item label="Job Title" value={job?.title} />
        <Item label="Department" value={job?.department} />
        <Item label="Location" value={job?.location} />
        <Item label="Status" value={job?.status ? "Open" : "Closed"} highlight />

        <Item label="Salary" value={`₹${job?.salary}`} />
        <Item label="Experience" value={job?.experience} />
        <Item label="Openings" value={job?.vacancy} />

        <Item
          label="Posted Date"
          value={
            job?.posted_date
              ? new Date(job.posted_date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"
          }
        />
        <Item
          label="Closing Date"
          value={
            job?.closing_date
              ? new Date(job.closing_date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"
          }
        />

        <Item label="Description" value={job?.description} full />
      </div>
    </div>
  );
};

const Item = ({ label, value, highlight = false, full = false }) => (
  <div className={`flex flex-col gap-1 ${full ? "sm:col-span-2" : ""}`}>
    <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
    {highlight ? (
      <span
        className={`text-xs font-medium px-3 py-1 rounded w-fit ${
          value === "Open"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>
    ) : (
      <span className="text-sm text-gray-800">{value}</span>
    )}
  </div>
);

export default ViewJob;
