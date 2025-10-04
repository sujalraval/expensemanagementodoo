"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "employee"
  department: string
  status: "active" | "inactive"
}

export default function UsersPage() {
  const router = useRouter()
  const [showAddUser, setShowAddUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/")
    }
  }, [router])

  const users: User[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "employee",
      department: "Engineering",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "manager",
      department: "Operations",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "employee",
      department: "Engineering",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "employee",
      department: "Marketing",
      status: "active",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.wilson@company.com",
      role: "manager",
      department: "Sales",
      status: "inactive",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-gray-100 text-gray-700"
      case "manager":
        return "bg-purple-100 text-purple-700"
      case "employee":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (showAddUser || selectedUser) {
    return (
      <MobileLayout role="admin">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowAddUser(false)
                setSelectedUser(null)
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedUser ? "Edit User" : "Add User"}</h1>
              <p className="text-gray-600 text-sm">
                {selectedUser ? "Update user information" : "Create a new user account"}
              </p>
            </div>
          </div>

          {/* User Form */}
          <form className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  defaultValue={selectedUser?.name}
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  defaultValue={selectedUser?.email}
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role
                </Label>
                <select
                  id="role"
                  defaultValue={selectedUser?.role || "employee"}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                  Department
                </Label>
                <Input
                  id="department"
                  placeholder="Engineering"
                  defaultValue={selectedUser?.department}
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              {selectedUser && (
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                    Status
                  </Label>
                  <select
                    id="status"
                    defaultValue={selectedUser?.status}
                    className="w-full h-12 rounded-xl border border-gray-200 px-4 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddUser(false)
                  setSelectedUser(null)
                }}
                className="flex-1 h-12 rounded-xl border-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium"
              >
                {selectedUser ? "Update User" : "Create User"}
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
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-1">{users.length} total users</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl flex items-center justify-center shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-xl border-gray-200 pl-12 bg-white"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-xl font-bold text-gray-900">{users.filter((u) => u.role === "employee").length}</div>
            <div className="text-xs text-gray-600 mt-1">Employees</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-xl font-bold text-purple-600">{users.filter((u) => u.role === "manager").length}</div>
            <div className="text-xs text-gray-600 mt-1">Managers</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-xl font-bold text-gray-900">{users.filter((u) => u.role === "admin").length}</div>
            <div className="text-xs text-gray-600 mt-1">Admins</div>
          </div>
        </div>

        {/* User List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                    {user.status === "inactive" && (
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">Inactive</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 truncate mb-2">{user.email}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getRoleBadgeColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{user.department}</span>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
