"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./auth-provider";
import { useToast } from "./toast-provider";
import { projectStorage, scenarioStorage } from "@/lib/storage";
import type { Project, Scenario } from "@/lib/types";
import {
  Plus,
  FolderOpen,
  MapPin,
  Calendar,
  LogOut,
  User,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  Menu,
  X,
  Home as HomeIcon,
  Lightbulb,
  Layout,
  Leaf,
} from "lucide-react";
import { CreateProjectDialog } from "./create-project-dialog";
import { ProjectCard } from "./project-card";
import { UserProfile } from "./user-profile";

export function ProjectsDashboard() {
  const { user, logout } = useAuth();
  const { showSuccess } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = () => {
    if (!user) return;
    const allProjects = projectStorage.getAll();
    const userProjects = allProjects.filter(
      (p: Project) => p.userId === user.id
    );
    setProjects(userProjects);
  };

  const stats = useMemo(() => {
    let totalUnits = 0;
    let totalPeopleHoused = 0;
    let totalBudget = 0;
    let scenarioCount = 0;

    projects.forEach((project) => {
      const scenarios = scenarioStorage.getByProjectId(project.id);
      scenarios.forEach((scenario: Scenario) => {
        if (scenario.calculatedResults) {
          scenarioCount++;
          totalUnits += scenario.calculatedResults.totalUnits || 0;
          totalPeopleHoused +=
            scenario.calculatedResults.estimatedPopulation || 0;
          totalBudget += scenario.calculatedResults.totalProjectCost || 0;
        }
      });
    });

    return {
      totalUnits,
      totalPeopleHoused,
      totalBudget,
      scenarioCount,
      avgUnitsPerProject:
        projects.length > 0 ? Math.round(totalUnits / projects.length) : 0,
    };
  }, [projects]);

  const recentProjects = useMemo(() => {
    return [...projects]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 3);
  }, [projects]);

  const handleProjectCreated = () => {
    loadProjects();
    setShowCreateDialog(false);
  };

  const handleProjectDeleted = (projectId: string) => {
    projectStorage.delete(projectId);
    // Immediately update state by filtering out the deleted project
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
    showSuccess("Project deleted successfully");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 overflow-x-hidden w-full">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Title - Always visible */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-blue-900 to-blue-700 flex items-center justify-center shadow-lg shrink-0">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                 Smart Housing Platform
                </h1>
                <p className="text-xs text-slate-600 truncate">
                Decisions based on data Support System
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                onClick={() => (window.location.href = "/home-configurator")}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 whitespace-nowrap"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Home Builder
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowProfile(true)}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 whitespace-nowrap"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                onClick={logout}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 whitespace-nowrap"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
              title={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-600" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-3 pb-3 border-t border-slate-200 pt-3 space-y-2 animate-in slide-in-from-top-2">
              <Button
                variant="ghost"
                onClick={() => {
                  window.location.href = "/home-configurator";
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Home Builder
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowProfile(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Stats Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Projects Card - Premium Blue Design */}
          <div className="group relative overflow-hidden rounded-2xl h-full">
            {/* Stunning gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
            
            {/* Animated floating elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl group-hover:blur-2xl group-hover:scale-110 transition-all duration-700" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl group-hover:scale-105 transition-all duration-700" />
            
            {/* Glossy shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-start justify-between mb-8">
                <p className="text-white/80 text-xs font-bold tracking-widest uppercase">
                  Total Projects
                </p>
                <div className="p-3 bg-white/15 backdrop-blur-md rounded-xl group-hover:bg-white/25 transition-all duration-300 group-hover:scale-110">
                  <FolderOpen className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <div className="text-7xl md:text-6xl text-white mb-3 drop-shadow-lg">
                  {projects.length}
                </div>
                
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 backdrop-blur-sm px-4 py-2 rounded-xl w-fit border border-white/30">
                  <TrendingUp className="h-4 w-4 text-white" />
                  <span className="text-white text-xs font-bold">
                   Active housing projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Housing Units Card */}
          <div className="group relative overflow-hidden rounded-2xl h-full shadow-lg hover:shadow-2xl transition-all duration-500">
            {/* Gradient background with teal accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
            
            {/* Animated accent blob */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-teal-400/15 rounded-full blur-3xl group-hover:blur-2xl group-hover:scale-110 transition-all duration-700" />
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl group-hover:scale-105 transition-all duration-700" />
            
{/* Glossy shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-teal-200/40 group-hover:border-teal-200/60 transition-colors duration-300" />
            
            {/* Refined top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-blue-500 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 pb-6 md:pb-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-8">
                <p className="text-slate-700 text-xs font-bold tracking-widest uppercase">
                  Housing Units
                </p>
                <div className="p-3 bg-teal-100/60 backdrop-blur-md rounded-xl group-hover:bg-teal-100/80 transition-all duration-300 group-hover:scale-110">
                  <Building className="h-5 w-5 text-teal-700" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <div className="text-6xl bg-gradient-to-br from-slate-800 to-slate-900 bg-clip-text text-transparent mb-3">
                  {stats.totalUnits.toLocaleString()}
                </div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100/60 to-cyan-100/60 backdrop-blur-sm px-4 py-2 rounded-xl w-fit border border-teal-200/40">
                  <TrendingUp className="h-4 w-4 text-teal-700" />
                  <span className="text-teal-800 text-xs font-bold">
                    {stats.avgUnitsPerProject} avg per project
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* People Housed Card */}
          <div className="group relative overflow-hidden rounded-2xl h-full shadow-lg hover:shadow-2xl transition-all duration-500">
            {/* Vibrant purple-blue gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100" />
            
            {/* Animated accent blob */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-purple-400/20 rounded-full blur-3xl group-hover:blur-2xl group-hover:scale-110 transition-all duration-700" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-300/10 rounded-full blur-3xl group-hover:scale-105 transition-all duration-700" />
            
            {/* Dynamic top line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 pb-6 md:pb-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-8">
                <p className="text-indigo-900 text-xs font-bold tracking-widest uppercase">
                  People Housed
                </p>
                <div className="p-2 bg-purple-100/60 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 text-purple-700" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <div className="text-6xl bg-gradient-to-br from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-3">
                  {stats.totalPeopleHoused.toLocaleString()}
                </div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100/60 to-indigo-100/60 backdrop-blur-sm px-4 py-2 rounded-xl w-fit border border-purple-200/40">
                  <TrendingUp className="h-4 w-4 text-purple-700" />
                  <span className="text-purple-800 text-xs font-bold">
                    Community Impact
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Investment Card */}
          <div className="group relative overflow-hidden rounded-2xl h-full shadow-lg hover:shadow-2xl transition-all duration-500">
            {/* Emerald-inspired gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100" />
            
            {/* Animated accent blob */}
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-400/15 rounded-full blur-3xl group-hover:blur-2xl group-hover:scale-110 transition-all duration-700" />
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-300/10 rounded-full blur-3xl group-hover:scale-105 transition-all duration-700" />
            
            {/* Elegant bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-cyan-500" />
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 pb-6 md:pb-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-8">
                <p className="text-emerald-900 text-xs font-bold tracking-widest uppercase">
                  Total Investment
                </p>
                <div className="p-2 bg-emerald-100/60 rounded-lg group-hover:scale-110 transition-transform">
                  <DollarSign className="h-5 w-5 text-emerald-700" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <div className="text-6xl bg-gradient-to-br from-emerald-900 to-teal-900 bg-clip-text text-transparent mb-3">
                  {stats.totalBudget > 0
                    ? `$${(stats.totalBudget / 1000000).toFixed(1)}M`
                    : "$0"}
                </div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100/60 to-cyan-100/60 backdrop-blur-sm px-4 py-2 rounded-xl w-fit border border-emerald-200/40">
                  <TrendingUp className="h-4 w-4 text-emerald-700" />
                  <span className="text-emerald-800 text-xs font-bold">
                    {stats.scenarioCount} scenarios analyzed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 md:mt-16">
          {/* Projects Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Your Projects
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {projects.length === 0
                    ? "Create your first housing project to get started"
                    : `Managing ${projects.length} housing ${
                        projects.length === 1 ? "project" : "projects"
                      }`}
                </p>
              </div>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-blue-900 hover:bg-blue-800 shadow-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Projects Grid */}
            {projects.length === 0 ? (
              <Card className="border-2 border-dashed border-slate-200 shadow-none">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <FolderOpen className="h-10 w-10 text-blue-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No projects yet
                  </h3>
                  <p className="text-sm text-slate-600 text-center mb-6 max-w-md leading-relaxed">
                    Start planning affordable housing by creating your first
                    project. You'll be able to simulate layouts, calculate
                    costs, and compare scenarios.
                  </p>
                  <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="bg-blue-900 hover:bg-blue-800 shadow-md"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={handleProjectDeleted}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Recent Activity – Enhanced with modern timeline style, fully responsive */}
            <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
              <CardHeader className="relative bg-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-white/10 rounded-t-full blur-3xl" />
                </div>
                <div className="relative flex items-center gap-2 sm:gap-3 py-4 sm:py-6">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-semibold">
                    Recent Activity
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-3 sm:px-6">
                {recentProjects.length > 0 ? (
                  <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-blue-200" />
                    <div className="space-y-3 sm:space-y-5">
                      {recentProjects.map((project, index) => (
                        <div key={project.id} className="relative flex gap-3 sm:gap-4">
                          {/* Timeline dot */}
                          <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-900 flex items-center justify-center shadow-md z-10 ring-4 ring-white">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white" />
                          </div>
                          {/* Content */}
                          <div className="flex-1 bg-white/60 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100">
                            <p className="font-semibold text-slate-900 truncate text-sm sm:text-base">
                              {project.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-xs sm:text-sm text-slate-600">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-700 shrink-0" />
                              <span className="truncate">{project.location.city}</span>
                            </div>
                            <div className="mt-2 text-xs text-slate-500 bg-white/80 inline-block px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                              {new Date(project.updatedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}{" "}
                              •{" "}
                              {new Date(project.updatedAt).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex p-3 sm:p-4 bg-blue-100 rounded-full mb-3 sm:mb-4">
                      <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-blue-700" />
                    </div>
                    <p className="text-slate-600 font-medium text-sm sm:text-base">
                      No recent activity yet
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
                      Your project updates will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips – Fully responsive with blue theme */}
            <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
              {/* Enhanced Header */}
              <CardHeader className="relative bg-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-white/10 rounded-t-full blur-3xl" />
                </div>
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 sm:py-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg shrink-0">
                      <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-bold">
                        Quick Tips
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-white/80 mt-1">
                        Boost your planning efficiency
                      </p>
                    </div>
                  </div>
                  {/* Decorative floating sparkles */}
                  <div className="hidden sm:block">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                      <div
                        className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 sm:pt-10 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Tip 1 */}
                  <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Layout className="h-6 w-6 sm:h-7 sm:w-7 text-blue-800" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed flex-1">
                        Create multiple scenarios to compare different layout
                        approaches
                      </p>
                      <div className="mt-4 flex items-center text-xs sm:text-sm text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore scenarios →
                      </div>
                    </div>
                  </div>

                  {/* Tip 2 */}
                  <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="p-3 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-800" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed flex-1">
                        Use cost breakdown tools to track budget allocation
                        efficiently
                      </p>
                      <div className="mt-4 flex items-center text-xs sm:text-sm text-cyan-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Review budgets →
                      </div>
                    </div>
                  </div>

                  {/* Tip 3 */}
                  <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Users className="h-6 w-6 sm:h-7 sm:w-7 text-blue-800" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed flex-1">
                        Analyze demographic data to optimize housing solutions for
                        communities
                      </p>
                      <div className="mt-4 flex items-center text-xs sm:text-sm text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        View analytics →
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-10 text-center">
                  <p className="text-xs sm:text-sm text-slate-600">
                    More tips unlock as you create projects
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Create Project Dialog */}
        <CreateProjectDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          onProjectCreated={handleProjectCreated}
        />

        {/* UserProfile Modal */}
        {showProfile && (
          <UserProfile
            onClose={() => setShowProfile(false)}
            projectCount={projects.length}
            completedCount={0}
            inProgressCount={projects.length}
          />
        )}
      </main>
    </div>
  );
}
