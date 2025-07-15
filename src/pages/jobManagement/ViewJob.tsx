import React from "react";

const ViewJob = ({ job }) => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Item label="Job Title" value={job?.jobTitle} highlight={undefined} full={undefined} />
        <Item label="Department" value={job?.department} highlight={undefined} full={undefined} />
        <Item label="Location" value={job?.location} highlight={undefined} full={undefined} />
        <Item label="Status" value={job?.status} highlight full={undefined} />

        <Item label="Salary" value={job?.salary} highlight={undefined} full={undefined} />
        <Item label="Experience" value={job?.experience} highlight={undefined} full={undefined} />
        <Item label="Skills" value={job?.skills} full highlight={undefined} />
        <Item label="Description" value={job?.description} full highlight={undefined} />
      </div>
    </div>
  );
};

const Item = ({ label, value, highlight, full }) => (
  <div className={`flex flex-col gap-1 ${full ? "sm:col-span-2" : ""}`}>
    <h3 className="text-base font-medium">{label}</h3>
    {highlight ? (
      <span
        className={`px-4 py-2 text-xs rounded-md w-fit ${
          value === "Open"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>
    ) : (
      <span className="text-sm capitalize">{value}</span>
    )}
  </div>
);

export default ViewJob;













