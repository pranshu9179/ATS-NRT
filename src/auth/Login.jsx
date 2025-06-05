import { ROUTES } from "@/utils";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return <div onClick={() => navigate(ROUTES?.DASHBOARD)}>login</div>;
}
