"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Country {
  name: {
    common: string
    official: string
  }
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
}

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    
    // Company Info
    companyName: "",
    companyDescription: "",
    industry: "",
    employeeCount: "",
    
    // Location
    country: "",
    currency: "",
    currencySymbol: "",
    timezone: "",
  })

  // Fetch countries data on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies')
        const data = await response.json()
        setCountries(data)
      } catch (error) {
        console.error('Error fetching countries:', error)
        setError('Failed to load countries. Please try again.')
      }
    }
    fetchCountries()
  }, [])

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    const currencyCode = Object.keys(country.currencies)[0]
    const currency = country.currencies[currencyCode]
    
    setFormData(prev => ({
      ...prev,
      country: country.name.common,
      currency: currencyCode,
      currencySymbol: currency.symbol,
    }))
    setSearchTerm(country.name.common)
  }

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.companyName || !formData.industry || !formData.employeeCount) {
      setError("Please fill in all required company fields")
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (!selectedCountry) {
      setError("Please select a country")
      return false
    }
    return true
  }

  const handleNext = () => {
    setError("")
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    setError("")
    setStep(prev => prev - 1)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!validateStep3()) return
    
    setLoading(true)

    try {
      // Mock API call to create company and admin user
      const signupData = {
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: 'admin'
        },
        company: {
          name: formData.companyName,
          description: formData.companyDescription,
          industry: formData.industry,
          employeeCount: formData.employeeCount,
          country: formData.country,
          currency: formData.currency,
          currencySymbol: formData.currencySymbol,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store user data
      localStorage.setItem("userRole", "admin")
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("companyData", JSON.stringify(signupData.company))
      
      // Redirect to admin dashboard
      router.push("/admin")
    } catch (error) {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D1616] via-[#31363F] to-[#31363F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#EEEEEE] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#EEEEEE] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#EEEEEE] rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl glass-effect p-8 rounded-3xl shadow-2xl relative z-10">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= stepNumber 
                  ? 'bg-gradient-to-r from-[#31363F] to-[#31363F] text-[#EEEEEE]' 
                  : 'bg-[#EEEEEE]/20 text-[#31363F]'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                  step > stepNumber ? 'bg-gradient-to-r from-[#31363F] to-[#31363F]' : 'bg-[#EEEEEE]/20'
                }`} />
              )}
            </div>
          ))}
        </div>

        <h1 className="text-4xl font-extrabold mb-2 text-center text-[#EEEEEE]">
          {step === 1 ? "Create Your Account" : step === 2 ? "Company Information" : "Location & Currency"}
        </h1>
        <p className="text-[#31363F] text-center mb-8">
          {step === 1 ? "Set up your admin account" : step === 2 ? "Tell us about your company" : "Select your country and currency"}
        </p>

        <form onSubmit={step === 3 ? handleSignUp : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-[#EEEEEE]">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-[#EEEEEE]">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
                  />
                </div>
              </div>

          <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#EEEEEE]">
                  Email Address *
            </Label>
            <Input
              id="email"
              type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
              required
                  className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
            />
          </div>

              <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#EEEEEE]">
                    Password *
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
              required
                    className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#EEEEEE]">
                    Confirm Password *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Company Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-[#EEEEEE] ">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
                  className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyDescription" className="text-sm font-medium text-[#EEEEEE] ">
                  Company Description
                </Label>
                <Textarea
                  id="companyDescription"
                  placeholder="Brief description of your company..."
                  value={formData.companyDescription}
                  onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                  rows={3}
                  className="rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300 resize-none"
            />
          </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium text-[#EEEEEE] ">
                    Industry *
                  </Label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => handleInputChange("industry", e.target.value)}
                    required
                    className="w-full h-12 rounded-xl border border-[#31363F]/50 px-4 bg-[#EEEEEE]/10 text-[#EEEEEE] focus:border-[#EEEEEE] focus:ring-2 focus:ring-[#EEEEEE]/20 outline-none transition-all duration-300"
                  >
                    <option value="" className="bg-[#1D1616] text-[#EEEEEE]">Select Industry</option>
                    <option value="Technology" className="bg-[#1D1616] text-[#EEEEEE]">Technology</option>
                    <option value="Healthcare" className="bg-[#1D1616] text-[#EEEEEE]">Healthcare</option>
                    <option value="Finance" className="bg-[#1D1616] text-[#EEEEEE]">Finance</option>
                    <option value="Manufacturing" className="bg-[#1D1616] text-[#EEEEEE]">Manufacturing</option>
                    <option value="Retail" className="bg-[#1D1616] text-[#EEEEEE]">Retail</option>
                    <option value="Education" className="bg-[#1D1616] text-[#EEEEEE]">Education</option>
                    <option value="Other" className="bg-[#1D1616] text-[#EEEEEE]">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="text-sm font-medium text-[#EEEEEE] ">
                    Employee Count *
                  </Label>
                  <select
                    id="employeeCount"
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                    required
                    className="w-full h-12 rounded-xl border border-[#31363F]/50 px-4 bg-[#EEEEEE]/10 text-[#EEEEEE] focus:border-[#EEEEEE] focus:ring-2 focus:ring-[#EEEEEE]/20 outline-none transition-all duration-300"
                  >
                    <option value="" className="bg-[#1D1616] text-[#EEEEEE]">Select Size</option>
                    <option value="1-10" className="bg-[#1D1616] text-[#EEEEEE]">1-10 employees</option>
                    <option value="11-50" className="bg-[#1D1616] text-[#EEEEEE]">11-50 employees</option>
                    <option value="51-200" className="bg-[#1D1616] text-[#EEEEEE]">51-200 employees</option>
                    <option value="201-500" className="bg-[#1D1616] text-[#EEEEEE]">201-500 employees</option>
                    <option value="500+" className="bg-[#1D1616] text-[#EEEEEE]">500+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Country and Currency Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="countrySearch" className="text-sm font-medium text-[#EEEEEE] ">
                  Select Country *
                </Label>
                <div className="relative">
                  <Input
                    id="countrySearch"
                    placeholder="Search for your country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-[#787A91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Country Dropdown */}
                {searchTerm && (
                  <div className="absolute z-10 w-full mt-1 bg-[#1D1616]/95 backdrop-blur-md border border-[#31363F]/50 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {filteredCountries.slice(0, 10).map((country, index) => {
                      const currencyCode = Object.keys(country.currencies)[0]
                      const currency = country.currencies[currencyCode]
                      return (
                        <div
                          key={index}
                          onClick={() => handleCountrySelect(country)}
                          className="px-4 py-3 hover:bg-[#EEEEEE]/10 cursor-pointer transition-colors duration-200 border-b border-[#787A91]/20 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-[#EEEEEE] font-medium ">{country.name.common}</div>
                              <div className="text-[#787A91] text-sm -accent">{country.name.official}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[#EEEEEE] text-sm ">{currencyCode}</div>
                              <div className="text-[#787A91] text-xs -accent">{currency.symbol}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Selected Country Display */}
              {selectedCountry && (
                <div className="glass-effect rounded-2xl p-4 bg-gradient-to-r from-[#EEEEEE]/10 to-[#787A91]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#EEEEEE] font-semibold ">{selectedCountry.name.common}</div>
                      <div className="text-[#787A91] text-sm -accent">{selectedCountry.name.official}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#EEEEEE] font-semibold ">
                        {formData.currency} ({formData.currencySymbol})
                      </div>
                      <div className="text-[#787A91] text-sm -accent">
                        {selectedCountry.currencies[formData.currency]?.name}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
              <p className="text-red-400 text-sm ">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 rounded-xl border-[#31363F]/50 text-[#EEEEEE] hover:bg-[#EEEEEE]/10 hover:border-[#EEEEEE] transition-all duration-300"
              >
                Back
              </Button>
            )}
          <Button
            type="submit"
            disabled={loading}
              className="flex-1 h-12 bg-gradient-to-r from-[#31363F] to-[#31363F] hover:from-[#1D1616] hover:to-[#31363F] text-[#EEEEEE] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#EEEEEE]/30 border-t-[#EEEEEE] rounded-full animate-spin"></div>
                  {step === 3 ? "Creating Account..." : "Next"}
                </div>
              ) : (
                step === 3 ? "Create Account" : "Next"
              )}
          </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#31363F] text-sm">
            Already have an account?{" "}
            <a href="/" className="text-[#EEEEEE] hover:text-[#31363F] font-medium transition-colors duration-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
