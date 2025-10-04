"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface PendingExpense {
  id: string
  employee: string
  title: string
  amount: string
  category: string
  date: string
  description: string
  submittedAt: string
  receipt?: string
}

export default function ApprovalsPage() {
  const router = useRouter()
  const [selectedExpense, setSelectedExpense] = useState<PendingExpense | null>(null)
  const [comment, setComment] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "manager") {
      router.push("/")
    }
  }, [router])

  const pendingExpenses: PendingExpense[] = [
    {
      id: "1",
      employee: "John Smith",
      title: "Conference Travel",
      amount: "$850.00",
      category: "Travel",
      date: "2024-01-15",
      description: "Annual tech conference in San Francisco. Includes flight and accommodation.",
      submittedAt: "2 hours ago",
    },
    {
      id: "2",
      employee: "Sarah Johnson",
      title: "Client Lunch",
      amount: "$125.00",
      category: "Meals",
      date: "2024-01-14",
      description: "Business lunch with potential client to discuss new project opportunities.",
      submittedAt: "5 hours ago",
    },
    {
      id: "3",
      employee: "Mike Chen",
      title: "Software License",
      amount: "$299.00",
      category: "Software",
      date: "2024-01-13",
      description: "Annual subscription for project management tool.",
      submittedAt: "Yesterday",
    },
    {
      id: "4",
      employee: "Emily Davis",
      title: "Office Supplies",
      amount: "$89.50",
      category: "Office Supplies",
      date: "2024-01-13",
      description: "Printer paper, pens, and notebooks for the team.",
      submittedAt: "Yesterday",
    },
  ]

  const handleApprove = async () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSelectedExpense(null)
      setComment("")
    }, 1000)
  }

  const handleReject = async () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSelectedExpense(null)
      setComment("")
    }, 1000)
  }

  if (selectedExpense) {
    return (
      <MobileLayout role="manager">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedExpense(null)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review Expense</h1>
              <p className="text-gray-600 text-sm">{selectedExpense.employee}</p>
            </div>
          </div>

          {/* Expense Details */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{selectedExpense.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedExpense.category}</p>
              </div>
              <div className="text-2xl font-bold text-gray-900">{selectedExpense.amount}</div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm font-medium text-gray-900">{selectedExpense.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Submitted</span>
                <span className="text-sm font-medium text-gray-900">{selectedExpense.submittedAt}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed">{selectedExpense.description}</p>
          </div>

          {/* Receipt */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Receipt</h4>
            <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-gray-500">Receipt image preview</p>
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Add Comment (Optional)</h4>
            <Textarea
              placeholder="Add any notes or feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="rounded-xl border-gray-200 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-20 pb-4">
            <Button
              onClick={handleReject}
              disabled={processing}
              variant="outline"
              className="flex-1 h-12 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 font-medium bg-transparent"
            >
              {processing ? "Processing..." : "Reject"}
            </Button>
            <Button
              onClick={handleApprove}
              disabled={processing}
              className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              {processing ? "Processing..." : "Approve"}
            </Button>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout role="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-600 mt-1">{pendingExpenses.length} expenses waiting for review</p>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">{pendingExpenses.length}</div>
              <div className="text-purple-100">Pending Approvals</div>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Pending List */}
        <div className="space-y-3">
          {pendingExpenses.map((expense) => (
            <button
              key={expense.id}
              onClick={() => setSelectedExpense(expense)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{expense.title}</div>
                  <div className="text-sm text-gray-500">{expense.employee}</div>
                </div>
                <div className="font-bold text-gray-900 text-lg">{expense.amount}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{expense.category}</span>
                  <span>•</span>
                  <span>{expense.submittedAt}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}
