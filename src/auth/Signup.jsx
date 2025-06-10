import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLayout } from "@/providers/LayoutProvider";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const roles = [
  { label: "HR", value: "HR" },
  { label: "Interviewer", value: "INTERVIEWER" },
  { label: "Admin", value: "ADMIN" },
];

const Signup = () => {
  const { currentLayout } = useLayout();
  const navigate = useNavigate();
  const location = useLocation();

  const isSuperAdmin = currentLayout?.name === "superadmin-layout";
  const from = location.state?.from?.pathname || "/";

  const [emailOtp, setEmailOtp] = useState(Array(6).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
      role: "HR",
      acceptTerms: false,
    },
  });

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const updated = [...emailOtp];
    updated[index] = value;
    setEmailOtp(updated);
    if (index < 5 && value) {
      document.getElementById(`otp-index-${index + 1}`)?.focus();
    }
  };

  const validatePassword = (pw) => {
    if (pw.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pw)) return "Password must include an uppercase letter";
    if (!/[a-z]/.test(pw)) return "Password must include a lowercase letter";
    if (!/[0-9]/.test(pw)) return "Password must include a number";
    if (!/[!@#$%^&*]/.test(pw))
      return "Password must include a special character";
    return null;
  };

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      organizationName,
      role,
      acceptTerms,
    } = data;

    if (!name || name.trim().length < 3)
      return alert("Name must be at least 3 characters");
    if (!email.includes("@")) return alert("Please enter a valid email");
    const pwError = validatePassword(password);
    if (pwError) return alert(pwError);
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (!acceptTerms) return alert("You must accept the Terms & Conditions");

    setLoading(true);

    try {
      if (isSuperAdmin) {
        const user = { name, email, org: organizationName, role };
        localStorage.setItem(`user_${email}`, JSON.stringify(user));
        alert("User created successfully");
        navigate(from, { replace: true });
        return;
      }

      if (!isOTPSent) {
        setIsOTPSent(true);
        setOpen(true);
        alert("OTP sent to your email (simulated)");
        return;
      }

      const fullOtp = emailOtp.join("");
      if (fullOtp.length !== 6) return alert("OTP must be 6 digits");

      const user = {
        name,
        email,
        password,
        org: organizationName,
        otp: fullOtp,
        role: "CANDIDATE",
      };
      localStorage.setItem(`user_${email}`, JSON.stringify(user));
      alert("Registered successfully");
      setOpen(false);
      navigate(from, { replace: true });
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-xs sm:max-w-sm [&>button]:hidden rounded-lg shadow-lg">
          <h3 className="text-center text-xl font-semibold mb-6 text-gray-900">
            Enter OTP
          </h3>
          <div className="flex justify-center gap-3 mb-8 px-2">
            {emailOtp.map((value, index) => (
              <input
                key={index}
                id={`otp-index-${index}`}
                type="text"
                maxLength={1}
                autoFocus={index === 0}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !value && index > 0) {
                    document.getElementById(`otp-index-${index - 1}`)?.focus();
                  }
                }}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="btn btn-primary px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Sign Up
            </h2>

            <label className="flex flex-col gap-2 text-gray-700">
              <span className="font-semibold">
                Name <span className="text-red-600">*</span>
              </span>
              <input
                type="text"
                placeholder="Your full name"
                className="input input-bordered border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name")}
              />
            </label>

            {isSuperAdmin && (
              <label className="flex flex-col gap-2 text-gray-700">
                <span className="font-semibold">Organization</span>
                <input
                  type="text"
                  placeholder="Organization name"
                  className="input input-bordered border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("organizationName")}
                />
              </label>
            )}

            <label className="flex flex-col gap-2 text-gray-700">
              <span className="font-semibold">
                Email <span className="text-red-600">*</span>
              </span>
              <input
                type="email"
                placeholder="example@mail.com"
                className="input input-bordered border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
              />
            </label>

            <label className="flex flex-col gap-2 relative text-gray-700">
              <span className="font-semibold">
                Create Password <span className="text-red-600">*</span>
              </span>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <div className="relative flex items-center">
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create Password"
                      className="input input-bordered w-full border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle Password Visibility"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                )}
              />
            </label>

            <label className="flex flex-col gap-2 relative text-gray-700">
              <span className="font-semibold">
                Confirm Password <span className="text-red-600">*</span>
              </span>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="input input-bordered w-full border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle Password Visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>

            {isSuperAdmin && (
              <label className="flex flex-col gap-2 text-gray-700">
                <span className="font-semibold">
                  Role <span className="text-red-600">*</span>
                </span>
                <select
                  className="input input-bordered border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("role")}
                >
                  {roles.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="flex items-center gap-3 text-gray-700">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                {...register("acceptTerms")}
              />
              <span className="text-sm">
                I accept the{" "}
                <Link to="#" className="link text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isOTPSent
                ? "Verify & Register"
                : "Send OTP"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
