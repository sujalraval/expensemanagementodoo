import { SignInForm } from "@/components/sign-in-form";
import { OdooIcon } from "@/components/odoo-icon";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D1616] via-[#31363F] to-[#31363F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#EEEEEE] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#EEEEEE] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#EEEEEE] rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md glass-effect p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-24 rounded-3xl mb-6 glass-icon">
            <OdooIcon size="lg" className="w-20 h-12 rounded-2xl" />
          </div>
          <h1 className="text-5xl font-extrabold mb-3 text-[#EEEEEE]">
            ExpenseFlow
          </h1>
          <p className="text-[#EEEEEE] text-lg opacity-90">Manage expenses effortlessly</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
