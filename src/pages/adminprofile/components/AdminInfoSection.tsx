import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";

type FormData = {
  fullname: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  designation: string;
};

type AdminInfoSectionProps = {
  onProfileUpdate?: (updatedInfo: FormData) => void;
};

const AdminInfoSection: React.FC<AdminInfoSectionProps> = ({ onProfileUpdate }) => {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    designation: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(true);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    setIsEditing(false);
    if (onProfileUpdate) {
      onProfileUpdate(formData);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <Card className="p-6 space-y-4 w-full relative ">
      <h2 className="text-xl font-bold">Personal Information</h2>
      {!isEditing && (
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      )}

      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-1">
          {isEditing ? (
            <>
              <Label className={undefined}>Full Name</Label>
              <Input
                placeholder="Enter full name"
                value={formData.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)} className={undefined} type={undefined}              />
            </>
          ) : (
            <p><strong>Full Name:</strong> {formData.fullname || "—"}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          {isEditing ? (
            <>
              <Label className={undefined}>Email</Label>
              <Input
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)} className={undefined}              />
            </>
          ) : (
            <p><strong>Email:</strong> {formData.email || "—"}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          {isEditing ? (
            <>
              <Label className={undefined}>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)} className={undefined}              />
            </>
          ) : (
            <p><strong>Phone:</strong> {formData.phone || "—"}</p>
          )}
        </div>

        {/* DOB */}
        <div className="space-y-1">
          {isEditing ? (
            <>
              <Label className={undefined}>Date of Birth</Label>
              <Input
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)} className={undefined}              />
            </>
          ) : (
            <p><strong>Date of Birth:</strong> {formatDate(formData.dob)}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-1">
          {isEditing ? (
            <>
              <Label className={undefined}>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className={undefined} >
                  <SelectItem value="male" className={undefined}>Male</SelectItem>
                  <SelectItem value="female" className={undefined} >Female</SelectItem>
                  <SelectItem value="other" className={undefined} >Other</SelectItem>
                </SelectContent>
              </Select>
            </>
          ) : (
            <p><strong>Gender:</strong> {formData.gender || "—"}</p>
          )}
        </div>

        {/* Designation */}
        <div className="space-y-1">
          {isEditing ? (
            <>
              <Label className={undefined}>Designation</Label>
              <Select
                value={formData.designation}
                onValueChange={(value) => handleChange("designation", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  <SelectItem value="admin" className={undefined} >Admin</SelectItem>
                  <SelectItem value="cto" className={undefined} >CTO</SelectItem>
                  <SelectItem value="hr/manager" className={undefined} >HR/Manager</SelectItem>
                  <SelectItem value="interviewr" className={undefined} >Interviewr</SelectItem>
                </SelectContent>
              </Select>
            </>
          ) : (
            <p><strong>Designation:</strong> {formData.designation || "—"}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      {isEditing && (
        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit} className={undefined} variant={undefined} size={undefined}>Submit</Button>
        </div>
      )}
    </Card>
  );
};

export default AdminInfoSection;
