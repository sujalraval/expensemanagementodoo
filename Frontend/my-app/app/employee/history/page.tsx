"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"

type ExpenseStatus = "pending" | "approved" | "rejected"

interface Expense {
  id: string
  title: string
  amount: string
  category: string
  date: string
  status: ExpenseStatus
}

export default function HistoryPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<"all" | ExpenseStatus>("all")

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "employee") {
      router.push("/")
    }
  }, [router])

  const expenses: Expense[] = [
    {
      id: "1",
      title: "Client Dinner",
      amount: "$125.00",
      category: "Meals",
      date: "Today",
      status: "pending",
    },
    {
      id: "2",
      title: "Taxi to Airport",
      amount: "$45.00",
      category: "Transportation",
      date: "Yesterday",
      status: "approved",
    },
    {
      id: "3",
      title: "Office Supplies",
      amount: "$89.50",
      category: "Office Supplies",
      date: "2 days ago",
      status: "pending",
    },
    {
      id: "4",
      title: "Software License",
      amount: "$299.00",
      category: "Software",
      date: "3 days ago",
      status: "approved",
    },
    {
      id: "5",
      title: "Hotel Stay",
      amount: "$450.00",
      category: "Travel",
      date: "5 days ago",
      status: "rejected",
    },
    {
      id: "6",
      title: "Team Lunch",
      amount: "$180.00",
      category: "Meals",
      date: "1 week ago",
      status: "approved",
    },
  ]

  const filteredExpenses = filter === "all" ? expenses : expenses.filter((e) => e.status === filter)

  const getStatusColor = (status: ExpenseStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const getStatusIcon = (status: ExpenseStatus) => {
    switch (status) {
      case "approved":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case "rejected":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      case "pending":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }

  return (
    <MobileLayout role="employee">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F044C]">Expense History</h1>
          <p className="text-[#787A91] mt-1">Track all your expenses</p>
        </div>

        {/* Filter Tabs */}
        <div className="glass-effect rounded-2xl p-2 flex gap-2">
          {[
            { label: "All", value: "all" as const },
            { label: "Pending", value: "pending" as const },
            { label: "Approved", value: "approved" as const },
            { label: "Rejected", value: "rejected" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                filter === tab.value ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-effect rounded-2xl p-4 text-center">
            <div className="text-xl font-bold text-gray-900">
              {expenses.filter((e) => e.status === "pending").length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Pending</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center">
            <div className="text-xl font-bold text-green-600">
              {expenses.filter((e) => e.status === "approved").length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Approved</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center">
            <div className="text-xl font-bold text-red-600">
              {expenses.filter((e) => e.status === "rejected").length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Rejected</div>
          </div>
        </div>

        {/* Expense List */}
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="glass-effect rounded-2xl p-4 shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{expense.title}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg">{expense.amount}</div>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                    expense.status,
                  )}`}
                >
                  {getStatusIcon(expense.status)}
                  <span className="capitalize">{expense.status}</span>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {filteredExpenses.length === 0 && (
          <div className="glass-effect rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-600">No {filter} expenses found</p>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}
