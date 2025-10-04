"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"

export default function EmployeeDashboard() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "employee") {
      router.push("/")
    }
  }, [router])

  return (
    <MobileLayout role="employee">
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="glass-effect rounded-3xl p-6 text-[#EEEEEE] bg-gradient-to-br from-[#31363F] to-[#31363F] shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-[#EEEEEE]/80">Ready to submit your expenses?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-effect rounded-2xl p-4 shadow-lg bg-gradient-to-br from-[#EEEEEE]/10 to-[#31363F]/10">
            <div className="text-2xl font-bold text-[#EEEEEE]">12</div>
            <div className="text-sm text-[#31363F] mt-1">Pending</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 shadow-lg bg-gradient-to-br from-[#EEEEEE]/10 to-[#31363F]/10">
            <div className="text-2xl font-bold text-[#EEEEEE]">$2,450</div>
            <div className="text-sm text-[#31363F] mt-1">This Month</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-[#EEEEEE] mb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/employee/submit")}
              className="w-full glass-effect rounded-2xl p-4 shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-[#EEEEEE]/10 to-[#31363F]/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#31363F] to-[#31363F] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#EEEEEE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#EEEEEE]">Submit Expense</div>
                  <div className="text-sm text-[#31363F]">Add a new expense</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-[#31363F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => router.push("/employee/history")}
              className="w-full glass-effect rounded-2xl p-4 shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-[#EEEEEE]/10 to-[#31363F]/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1D1616] to-[#31363F] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#EEEEEE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#EEEEEE]">View History</div>
                  <div className="text-sm text-[#31363F]">Track your expenses</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-[#31363F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Expenses */}
        <div>
          <h3 className="text-lg font-bold text-[#EEEEEE] mb-3">Recent Expenses</h3>
          <div className="space-y-3">
            {[
              { title: "Client Dinner", amount: "$125.00", status: "Pending", date: "Today" },
              { title: "Taxi to Airport", amount: "$45.00", status: "Approved", date: "Yesterday" },
              { title: "Office Supplies", amount: "$89.50", status: "Pending", date: "2 days ago" },
            ].map((expense, i) => (
              <div key={i} className="glass-effect rounded-2xl p-4 shadow-lg bg-gradient-to-r from-[#EEEEEE]/10 to-[#31363F]/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-[#EEEEEE]">{expense.title}</div>
                  <div className="font-bold text-[#EEEEEE]">{expense.amount}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#31363F]">{expense.date}</div>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      expense.status === "Approved" 
                        ? "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-500/30" 
                        : "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {expense.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
