import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, PenTool, CreditCard, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 relative overflow-hidden">
      {/* Logo top left */}
      <div className="absolute top-6 left-8 z-20 flex items-center gap-3">
        <Image src="/logo.svg" alt="AutoMuse Logo" width={48} height={48} className="drop-shadow-lg" />
        <span className="text-2xl font-bold text-white hidden md:inline">AutoMuse</span>
      </div>
      {/* Animated floating shapes */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-violet-800 opacity-30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-violet-500 opacity-20 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-violet-700 opacity-20 rounded-full blur-2xl animate-float-fast" />
      </div>
      {/* Hero Section */}
      <div className="text-center mb-16 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
          AutoMuse
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          AI-powered content creation platform for creators, marketers, and businesses.
        </p>
        <Link href="/dashboard">
          <Button className="px-8 py-4 text-lg font-semibold rounded-full bg-violet-700 hover:bg-violet-600 transition-colors shadow-lg">
            Get Started
          </Button>
        </Link>
      </div>
      {/* Feature Cards with motion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl z-10">
        {/* Card 1 */}
        <div className="bg-black/80 border border-violet-700 rounded-2xl p-8 flex flex-col items-center shadow-xl backdrop-blur-md transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in">
          <Sparkles className="w-10 h-10 text-violet-400 mb-4 animate-bounce-slow" />
          <h3 className="text-xl font-bold text-white mb-4">15+ Templates</h3>
          <p className="text-gray-300 mb-4 text-center">Choose from a wide variety of content templates for blogs, ads, emails, and more.</p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-violet-700 text-violet-300 hover:bg-violet-800 hover:text-white transition-colors w-full">
              Learn More
            </Button>
          </Link>
        </div>
        {/* Card 2 */}
        <div className="bg-black/80 border border-violet-700 rounded-2xl p-8 flex flex-col items-center shadow-xl backdrop-blur-md transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in delay-100">
          <PenTool className="w-10 h-10 text-violet-400 mb-4 animate-bounce-slow" />
          <h3 className="text-xl font-bold text-white mb-4">Content Creation</h3>
          <p className="text-gray-300 mb-4 text-center">Generate high-quality, original content in seconds with AI assistance.</p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-violet-700 text-violet-300 hover:bg-violet-800 hover:text-white transition-colors w-full">
              Learn More
            </Button>
          </Link>
        </div>
        {/* Card 3 */}
        <div className="bg-black/80 border border-violet-700 rounded-2xl p-8 flex flex-col items-center shadow-xl backdrop-blur-md transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in delay-200">
          <CreditCard className="w-10 h-10 text-violet-400 mb-4 animate-bounce-slow" />
          <h3 className="text-xl font-bold text-white mb-4">Subscriptions</h3>
          <p className="text-gray-300 mb-4 text-center">Flexible plans for individuals and teams. Upgrade anytime to unlock more features.</p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-violet-700 text-violet-300 hover:bg-violet-800 hover:text-white transition-colors w-full">
              Learn More
            </Button>
          </Link>
        </div>
        {/* Card 4 */}
        <div className="bg-black/80 border border-violet-700 rounded-2xl p-8 flex flex-col items-center shadow-xl backdrop-blur-md transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in delay-300">
          <Headphones className="w-10 h-10 text-violet-400 mb-4 animate-bounce-slow" />
          <h3 className="text-xl font-bold text-white mb-4">24/7 Support</h3>
          <p className="text-gray-300 mb-4 text-center">Our team is always here to help you, any time, any day.</p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-violet-700 text-violet-300 hover:bg-violet-800 hover:text-white transition-colors w-full">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 top-1/2 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-violet-900/40 via-black/80 to-black opacity-60 animate-gradient-move" />
      </div>
    </div>
  );
}
