import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 animate-fade-in">
            Scientific Calculator
          </h1>
          <p className="text-purple-200 text-lg">
            A powerful calculator with advanced mathematical functions
          </p>
        </div>
        <Calculator />
      </div>
    </div>
  );
}
