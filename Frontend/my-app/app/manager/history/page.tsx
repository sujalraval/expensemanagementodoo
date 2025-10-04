"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"

type ExpenseStatus = "approved" | "rejected"

interface ReviewedExpense {
  id: string
  employee: string
  title: string
  amount: string
  category: string
  date: string
  status: ExpenseStatus
  reviewedAt: string
}

export default function ManagerHistoryPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<"all" | ExpenseStatus>("all")

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "manager") {
      router.push("/")
    }
  }, [router])

  const expenses: ReviewedExpense[] = [
    {
      id: "1",
      employee: "John Smith",
      title: "Team Lunch",
      amount: "$180.00",
      category: "Meals",
      date: "2024-01-10",
      status: "approved",
      reviewedAt: "2 days ago",
    },
    {
      id: "2",
      employee: "Sarah Johnson",
      title: "Taxi Fare",
      amount: "$45.00",
      category: "Transportation",
      date: "2024-01-09",
      status: "approved",
      reviewedAt: "3 days ago",
    },
    {
      id: "3",
      employee: "Mike Chen",
      title: "Hotel Stay",
      amount: "$450.00",
      category: "Travel",
      date: "2024-01-08",
      status: "rejected",
      reviewedAt: "4 days ago",
    },
    {
      id: "4",
      employee: "Emily Davis",
      title: "Office Equipment",
      amount: "$299.00",
      category: "Office Supplies",
      date: "2024-01-07",
      status: "approved",
      reviewedAt: "5 days ago",
    },
    {
      id: "5",
      employee: "John Smith",
      title: "Conference Ticket",
      amount: "$599.00",
      category: "Travel",
      date: "2024-01-06",
      status: "approved",
      reviewedAt: "6 days ago",
    },
    {
      id: "6",
      employee: "Sarah Johnson",
      title: "Client Dinner",
      amount: "$250.00",
      category: "Meals",
      date: "2024-01-05",
      status: "rejected",
      reviewedAt: "1 week ago",
    },
  ]

  const filteredExpenses = filter === "all" ? expenses : expenses.filter((e) => e.status === filter)

  const getStatusColor = (status: ExpenseStatus) => {
    return status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  }

  const getStatusIcon = (status: ExpenseStatus) => {
    if (status === "approved") {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }

  return (
    <MobileLayout role="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review History</h1>
          <p className="text-gray-600 mt-1">All reviewed expenses</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm flex gap-2">
          {[
            { label: "All", value: "all" as const },
            { label: "Approved", value: "approved" as const },
            { label: "Rejected", value: "rejected" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                filter === tab.value ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {expenses.filter((e) => e.status === "approved").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Approved</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {expenses.filter((e) => e.status === "rejected").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Rejected</div>
          </div>
        </div>

        {/* Expense List */}
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{expense.title}</div>
                  <div className="text-sm text-gray-500">{expense.employee}</div>
                </div>
                <div className="font-bold text-gray-900 text-lg">{expense.amount}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">Reviewed {expense.reviewedAt}</div>
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                    expense.status,
                  )}`}
                >
                  {getStatusIcon(expense.status)}
                  <span className="capitalize">{expense.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExpenses.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
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
