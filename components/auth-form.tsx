"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "./auth-provider";
import { useToast } from "./toast-provider";
import {
  Building2,
  Mail,
  User,
  Phone,
  MapPin,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Zap,
  Globe,
  Users,
  ArrowRight,
  Play,
} from "lucide-react";

type RoleType =
  | "Government Planner"
  | "NGO Manager"
  | "Real Estate Developer"
  | "Architect"
  | "Consultant"
  | "Individual Homeowner"
  | "Other";

interface RoleOption {
  value: RoleType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    value: "Government Planner",
    label: "Government Planner",
    icon: Building2,
    description: "Plan large-scale housing projects",
  },
  {
    value: "NGO Manager",
    label: "NGO Manager",
    icon: Users,
    description: "Manage affordable housing programs",
  },
  {
    value: "Real Estate Developer",
    label: "Real Estate Developer",
    icon: TrendingUp,
    description: "Analyze project viability & ROI",
  },
  {
    value: "Architect",
    label: "Architect",
    icon: BarChart3,
    description: "Design optimal layouts",
  },
  {
    value: "Consultant",
    label: "Consultant",
    icon: Globe,
    description: "Advisory & strategic planning",
  },
  {
    value: "Individual Homeowner",
    label: "Individual Homeowner",
    icon: CheckCircle,
    description: "Build your custom home",
  },
  {
    value: "Other",
    label: "Other",
    icon: Zap,
    description: "Other roles",
  },
];

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [expandedOptionalFields, setExpandedOptionalFields] = useState(false);
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInName, setSignInName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Sign Up Form State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState<RoleType | "">("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Sign in form submitted");

    if (!signInEmail || !signInName) {
      showError("Please fill in all required fields");
      return;
    }

    console.log("[v0] Calling login with:", { signInEmail, signInName });
    login(signInEmail, signInName);
    showSuccess(`🎉 Welcome back, ${signInName}!`);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Sign up form submitted");

    if (!email || !name) {
      showError("Please fill in all required fields");
      return;
    }

    console.log("[v0] Calling login with full profile");
    login(email, name, organization, role, phone, country);
    showSuccess(`🎉 Welcome, ${name}!`);
  };

  const handleGoogleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[v0] Google sign-in button clicked");

    const demoEmail = "demo@example.com";
    const demoName = "Demo User";
    const demoOrg = "Demo Organization";
    const demoRole = "Government Planner";
    const demoPhone = "+1234567890";
    const demoCountry = "United States";

    console.log("[v0] Logging in demo user");
    login(demoEmail, demoName, demoOrg, demoRole, demoPhone, demoCountry);
    showSuccess(`🎉 Welcome back, ${demoName}!`);
  };

  const handleQuickDemoLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[v0] Quick demo login clicked");

    const demoEmail = "demo@example.com";
    const demoName = "Demo User";
    const demoOrg = "Demo Organization";
    const demoRole = "Government Planner";
    const demoPhone = "+1234567890";
    const demoCountry = "United States";

    login(demoEmail, demoName, demoOrg, demoRole, demoPhone, demoCountry);
    showSuccess(
      `🎉 Demo loaded! Explore a sample 500-unit project with full analysis.`
    );
  };

  const handleRoleSelect = (selectedRole: RoleType) => {
    setRole(selectedRole);
    setShowRoleSelector(false);
  };

  const getRoleLabel = () => {
    const selected = ROLE_OPTIONS.find((opt) => opt.value === role);
    return selected ? selected.label : "Select role";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Enhanced Branding & Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
              <svg viewBox="0 0 100 100" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#60a5fa', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#grad1)" stroke="white" strokeWidth="2"/>
                <path d="M50 20 L65 35 L60 50 L65 65 L50 80 L35 65 L40 50 L35 35 Z" fill="white" fillOpacity="0.9"/>
                <circle cx="50" cy="50" r="8" fill="white"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              RHS Engine
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Smart Affordable Housing Planning - Data-driven solutions for governments, NGOs, and developers to design sustainable housing.
            </p>
          </div>

          {/* Feature Highlights with Updated Content */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/40 backdrop-blur-sm border border-white/80">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 flex-none">
                <Zap className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Real-Time Financial Modeling
                </h3>
                <p className="text-sm text-slate-600">
                  Instantly calculate costs, ROI, and affordability metrics
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/40 backdrop-blur-sm border border-white/80">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 flex-none">
                <BarChart3 className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Scenario Comparison Engine
                </h3>
                <p className="text-sm text-slate-600">
                  Compare layouts, densities, and infrastructure impact
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/40 backdrop-blur-sm border border-white/80">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 flex-none">
                <Globe className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Infrastructure Assessment
                </h3>
                <p className="text-sm text-slate-600">
                  Evaluate water, electricity, waste, and compliance needs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/40 backdrop-blur-sm border border-white/80">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 flex-none">
                <TrendingUp className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Demand Forecasting
                </h3>
                <p className="text-sm text-slate-600">
                  Project 5-20 year housing demand with demographic analysis
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-700 mb-3">
              Trusted by:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-sm">
                <p className="font-bold text-lg text-blue-900">50K+</p>
                <p className="text-slate-600">Units Planned</p>
              </div>
              <div className="text-sm">
                <p className="font-bold text-lg text-blue-900">15+</p>
                <p className="text-slate-600">Organizations</p>
              </div>
              <div className="text-sm">
                <p className="font-bold text-lg text-blue-900">$2B+</p>
                <p className="text-slate-600">Capital Modeled</p>
              </div>
              <div className="text-sm">
                <p className="font-bold text-lg text-blue-900">100%</p>
                <p className="text-slate-600">Data Privacy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="shadow-2xl border-0 w-full">
          <CardHeader className="space-y-1 pb-6">
            <div className="lg:hidden mb-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-blue-900 text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  Smart planning for affordable housing
                </p>
              </div>
            </div>
            <CardTitle className="text-3xl">Welcome</CardTitle>
            <CardDescription>
              Access the platform for housing planning & analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v: string) => {
                if (v === "signin" || v === "signup") {
                  setActiveTab(v);
                }
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* SIGN IN TAB */}
              <TabsContent value="signin" className="space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Quick Demo Button */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-md border-2 border-blue-900 bg-blue-50 hover:bg-blue-100 text-sm font-medium text-blue-900 transition-colors cursor-pointer"
                >
                  <Play className="h-4 w-4" />
                  Try Demo Project
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="signin-name"
                        type="text"
                        placeholder="John Doe"
                        value={signInName}
                        onChange={(e) => setSignInName(e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-900"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-slate-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-blue-900 hover:bg-blue-800"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* SIGN UP TAB */}
              <TabsContent value="signup" className="space-y-4 max-h-[600px] overflow-y-auto">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign up with Google
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">
                      Or create account
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  {/* Essential Fields - Always Visible */}
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role Selection - Visual Cards */}
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <button
                      type="button"
                      onClick={() => setShowRoleSelector(!showRoleSelector)}
                      className="w-full h-11 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-left flex items-center justify-between transition-colors"
                    >
                      <span className="text-slate-600 flex-1">
                        {getRoleLabel()}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </button>

                    {showRoleSelector && (
                      <div className="grid grid-cols-2 gap-2 p-3 border border-slate-200 rounded-lg bg-slate-50">
                        {ROLE_OPTIONS.map((opt) => {
                          const IconComponent = opt.icon;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => handleRoleSelect(opt.value)}
                              className={`p-3 rounded-lg text-left border transition-all ${
                                role === opt.value
                                  ? "border-blue-900 bg-blue-50"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <IconComponent className="h-4 w-4 text-blue-900" />
                                <p className="text-xs font-semibold text-slate-900">
                                  {opt.label}
                                </p>
                              </div>
                              <p className="text-xs text-slate-600">
                                {opt.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Optional Fields - Expandable Section */}
                  <div className="pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedOptionalFields(!expandedOptionalFields)
                      }
                      className="w-full flex items-center justify-between py-2 px-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
                    >
                      <span>Optional Details</span>
                      <span className="text-xs text-slate-500">
                        {expandedOptionalFields ? "Hide" : "Show"}
                      </span>
                    </button>

                    {expandedOptionalFields && (
                      <div className="space-y-3 mt-3 pt-3 border-t border-slate-200">
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              id="organization"
                              type="text"
                              placeholder="Government Agency, NGO, Developer..."
                              value={organization}
                              onChange={(e) => setOrganization(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1234567890"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              id="country"
                              type="text"
                              placeholder="United States"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-blue-900 hover:bg-blue-800 mt-4"
                  >
                    Create Account & Get Started
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Footer CTA */}
            <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
              <p>
                Ready to plan your next housing project?
                <br />
                Start free today, no credit card required.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
