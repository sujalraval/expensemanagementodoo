"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ApprovalRule {
  id: string
  name: string
  type: "percentage" | "specific" | "hybrid"
  threshold?: number
  approvers?: string[]
  description: string
  active: boolean
}

export default function RulesPage() {
  const router = useRouter()
  const [showAddRule, setShowAddRule] = useState(false)
  const [selectedRule, setSelectedRule] = useState<ApprovalRule | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/")
    }
  }, [router])

  const rules: ApprovalRule[] = [
    {
      id: "1",
      name: "Standard Approval",
      type: "percentage",
      threshold: 500,
      description: "Expenses under $500 require manager approval",
      active: true,
    },
    {
      id: "2",
      name: "High Value Approval",
      type: "specific",
      approvers: ["CFO", "Department Head"],
      description: "Expenses over $5000 require CFO and Department Head approval",
      active: true,
    },
    {
      id: "3",
      name: "Travel Expenses",
      type: "hybrid",
      threshold: 1000,
      approvers: ["Travel Manager"],
      description: "Travel expenses require Travel Manager approval",
      active: true,
    },
    {
      id: "4",
      name: "Software Purchases",
      type: "specific",
      approvers: ["IT Manager", "Finance"],
      description: "Software purchases require IT and Finance approval",
      active: false,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-blue-100 text-blue-700"
      case "specific":
        return "bg-purple-100 text-purple-700"
      case "hybrid":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "percentage":
        return "Threshold"
      case "specific":
        return "Specific Approver"
      case "hybrid":
        return "Hybrid"
      default:
        return type
    }
  }

  if (showAddRule || selectedRule) {
    return (
      <MobileLayout role="admin">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowAddRule(false)
                setSelectedRule(null)
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedRule ? "Edit Rule" : "Add Rule"}</h1>
              <p className="text-gray-600 text-sm">
                {selectedRule ? "Update approval rule" : "Create a new approval rule"}
              </p>
            </div>
          </div>

          {/* Rule Form */}
          <form className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Rule Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Standard Approval"
                  defaultValue={selectedRule?.name}
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Rule Type
                </Label>
                <select
                  id="type"
                  defaultValue={selectedRule?.type || "percentage"}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="percentage">Threshold Based</option>
                  <option value="specific">Specific Approver</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold" className="text-sm font-medium text-gray-700">
                  Amount Threshold
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <Input
                    id="threshold"
                    type="number"
                    placeholder="500"
                    defaultValue={selectedRule?.threshold}
                    className="h-12 rounded-xl border-gray-200 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Describe when this rule applies..."
                  defaultValue={selectedRule?.description}
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              {selectedRule && (
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Active</span>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      selectedRule.active ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        selectedRule.active ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddRule(false)
                  setSelectedRule(null)
                }}
                className="flex-1 h-12 rounded-xl border-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium"
              >
                {selectedRule ? "Update Rule" : "Create Rule"}
              </Button>
            </div>
          </form>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Approval Rules</h1>
            <p className="text-gray-600 mt-1">{rules.length} rules configured</p>
          </div>
          <button
            onClick={() => setShowAddRule(true)}
            className="w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl flex items-center justify-center shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{rules.filter((r) => r.active).length}</div>
            <div className="text-sm text-gray-600 mt-1">Active Rules</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-400">{rules.filter((r) => !r.active).length}</div>
            <div className="text-sm text-gray-600 mt-1">Inactive Rules</div>
          </div>
        </div>

        {/* Rule Types Info */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Rule Types</p>
              <p className="text-blue-700 leading-relaxed">
                Threshold: Based on amount. Specific: Designated approvers. Hybrid: Combination of both.
              </p>
            </div>
          </div>
        </div>

        {/* Rules List */}
        <div className="space-y-3">
          {rules.map((rule) => (
            <button
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold text-gray-900">{rule.name}</div>
                    {!rule.active && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">Inactive</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{rule.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getTypeColor(rule.type)}`}>
                  {getTypeLabel(rule.type)}
                </span>
                {rule.threshold && <span className="text-xs text-gray-500">${rule.threshold}+</span>}
                {rule.approvers && <span className="text-xs text-gray-500">{rule.approvers.length} approver(s)</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}
