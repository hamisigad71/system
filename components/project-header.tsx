"use client"

import type { Project, Scenario } from "@/lib/types"
import { MapPin, DollarSign, Users, Maximize2, Home, TrendingUp, Zap, Droplets, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/calculations"

interface ProjectHeaderProps {
  project: Project
  scenarios?: Scenario[]
}

export function ProjectHeader({ project, scenarios = [] }: ProjectHeaderProps) {
  const landSizeDisplay =
    project.landSizeUnit === "acres"
      ? `${project.landSize.toLocaleString()} acres (${(project.landSize * 4046.86).toLocaleString()} m²)`
      : `${project.landSize.toLocaleString()} m² (${(project.landSize / 10000).toFixed(2)} hectares)`

  const incomeGroupLabel = {
    low: "Low Income",
    "lower-middle": "Lower-Middle Income",
    middle: "Middle Income",
    mixed: "Mixed Income",
  }[project.targetIncomeGroup]

  // Calculate metrics from actual scenarios if they exist
  const hasScenarios = scenarios && scenarios.length > 0
  
  let totalUnits = 0
  let estimatedPopulation = 0
  let landSizeInSqm = project.landSizeUnit === "acres" ? project.landSize * 4046.86 : project.landSize
  let netDensity = 0

  if (hasScenarios) {
    // Sum up units from all scenarios
    scenarios.forEach((scenario) => {
      if (scenario.calculatedResults) {
        totalUnits += scenario.calculatedResults.totalUnits
        estimatedPopulation += scenario.calculatedResults.estimatedPopulation
      }
    })
    
    // Calculate density based on actual scenario units
    if (totalUnits > 0) {
      netDensity = Math.round(totalUnits / (landSizeInSqm / 10000))
    }
  }
  
  return (
    <header className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Title and Location */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-slate-600">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-lg">
                {project.location.city}, {project.location.country}
              </span>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Land Size - Blue */}
            <div className="group bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300">
              <div className="h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Maximize2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Land</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Size</p>
                  <p className="text-sm md:text-base font-bold text-slate-900 line-clamp-2">{landSizeDisplay}</p>
                </div>
              </div>
            </div>

            {/* Project Type - Light Green */}
            <div className="group bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
              <div className="h-3 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600"></div>
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <Home className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Type</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Project</p>
                  <p className="text-sm md:text-base font-bold text-slate-900 capitalize line-clamp-2">{project.projectType ? project.projectType.replace("-", " ") : "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Target Income - Purple */}
            <div className="group bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <div className="h-3 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"></div>
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Target</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Income</p>
                  <p className="text-sm md:text-base font-bold text-slate-900 line-clamp-2">{incomeGroupLabel}</p>
                </div>
              </div>
            </div>

            {/* Budget Range - Orange */}
            <div className="group bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100 overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300">
              <div className="h-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Budget</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Range</p>
                  <div className="space-y-0.5">
                    <p className="text-xs md:text-sm font-bold text-slate-900">{formatCurrency(project.budgetRange.min, project.budgetRange.currency)}</p>
                    <p className="text-xs md:text-sm font-bold text-slate-900">{formatCurrency(project.budgetRange.max, project.budgetRange.currency)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
