"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SubmitExpensePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    receipt: null as File | null,
  })

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "employee") {
      router.push("/")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      router.push("/employee")
    }, 1000)
  }

  const categories = ["Travel", "Meals", "Office Supplies", "Software", "Transportation", "Other"]

  return (
    <MobileLayout role="employee">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Submit Expense</h1>
          <p className="text-gray-600 mt-1">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Expense Title */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Expense Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Client Dinner"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="h-12 rounded-xl border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  className="h-12 rounded-xl border-gray-200 pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full h-12 rounded-xl border border-gray-200 px-4 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="h-12 rounded-xl border-gray-200"
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add any additional details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="rounded-xl border-gray-200 resize-none"
            />
          </div>

          {/* Receipt Upload */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <Label className="text-sm font-medium text-gray-700">Receipt</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {formData.receipt ? formData.receipt.name : "Upload receipt image"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, receipt: e.target.files?.[0] || null })}
                className="hidden"
                id="receipt-upload"
              />
              <label htmlFor="receipt-upload">
                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100">
                  Choose File
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 h-12 rounded-xl border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
            >
              {loading ? "Submitting..." : "Submit Expense"}
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  )
}
