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
          <h1 className="text-2xl font-bold text-[#EEEEEE] glow-text">Submit Expense</h1>
          <p className="text-[#787A91] mt-1 glow-text-accent">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Expense Title */}
          <div className="glass-effect rounded-2xl p-5 shadow-lg space-y-4 bg-gradient-to-r from-[#EEEEEE]/10 to-[#787A91]/10">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-[#EEEEEE] glow-text">
                Expense Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Client Dinner"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#787A91]/50 text-[#EEEEEE] placeholder-[#787A91] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-[#EEEEEE] glow-text">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#787A91] font-medium">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#787A91]/50 text-[#EEEEEE] placeholder-[#787A91] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300 pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-[#EEEEEE] glow-text">
                Category
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full h-12 rounded-xl border border-[#787A91]/50 px-4 bg-[#EEEEEE]/10 text-[#EEEEEE] focus:border-[#EEEEEE] focus:ring-2 focus:ring-[#EEEEEE]/20 outline-none transition-all duration-300"
              >
                <option value="" className="bg-[#0F044C] text-[#EEEEEE]">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0F044C] text-[#EEEEEE]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-[#EEEEEE] glow-text">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#787A91]/50 text-[#EEEEEE] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Description */}
          <div className="glass-effect rounded-2xl p-5 shadow-lg space-y-2 bg-gradient-to-r from-[#EEEEEE]/10 to-[#787A91]/10">
            <Label htmlFor="description" className="text-sm font-medium text-[#EEEEEE] glow-text">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add any additional details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="rounded-xl bg-[#EEEEEE]/10 border-[#787A91]/50 text-[#EEEEEE] placeholder-[#787A91] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300 resize-none"
            />
          </div>

          {/* Receipt Upload */}
          <div className="glass-effect rounded-2xl p-5 shadow-lg space-y-3 bg-gradient-to-r from-[#EEEEEE]/10 to-[#787A91]/10">
            <Label className="text-sm font-medium text-[#EEEEEE] glow-text">Receipt</Label>
            <div className="border-2 border-dashed border-[#787A91]/50 rounded-xl p-6 text-center hover:border-[#EEEEEE]/50 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#141E61] to-[#787A91] rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-[#EEEEEE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-[#787A91] mb-2 glow-text-accent">
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
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#141E61] to-[#787A91] text-[#EEEEEE] rounded-lg text-sm font-medium cursor-pointer hover:from-[#0F044C] hover:to-[#141E61] transition-all duration-300">
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
              className="flex-1 h-12 rounded-xl border-[#787A91]/50 text-[#EEEEEE] hover:bg-[#EEEEEE]/10 hover:border-[#EEEEEE] transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 bg-gradient-to-r from-[#141E61] to-[#787A91] hover:from-[#0F044C] hover:to-[#141E61] text-[#EEEEEE] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#EEEEEE]/30 border-t-[#EEEEEE] rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Expense"
              )}
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  )
}
