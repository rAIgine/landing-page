"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  FileText,
  Zap,
  CheckCircle,
  Play,
  Database,
  BarChart3,
  Users,
  Clock,
  Monitor,
  MousePointer,
  Settings,
  Factory,
  Cpu,
  Network,
  Shield,
  TrendingUp,
  Award,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ContactModal } from "@/components/contact-modal";

// ShadCN UI Components with improved colors
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047D9] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default:
      "bg-[#0047D9] text-white hover:bg-[#003BB8] shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-[#0047D9] text-[#0047D9] bg-white hover:bg-[#0047D9] hover:text-white hover:scale-105",
    ghost: "text-slate-700 hover:bg-[#0047D9]/10 hover:text-[#0047D9]",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:scale-105",
  };
  const sizes = {
    default: "h-11 px-6 py-3 text-sm",
    sm: "h-9 rounded-md px-4 text-sm",
    lg: "h-14 rounded-xl px-8 text-lg",
    icon: "h-11 w-11",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <div
    className={`rounded-xl border border-slate-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <h3
    className={`text-xl font-bold leading-none tracking-tight text-slate-900 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardContent = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({
  children,
  variant = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
  [key: string]: any;
}) => {
  const variants = {
    default: "bg-[#0047D9] text-white",
    secondary: "bg-slate-100 text-slate-700",
    outline: "text-[#0047D9] border-2 border-[#0047D9] bg-blue-50",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Animation Hook
const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, isInView] as const;
};

const rAIgineLanding = () => {
  const [heroRef, heroInView] = useInView();
  const [workflowRef, workflowInView] = useInView();
  const [automationRef, automationInView] = useInView();
  const [benefitsRef, benefitsInView] = useInView();
  const [isAutomationRunning, setIsAutomationRunning] = useState(false);
  const [automationStep, setAutomationStep] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const automationSteps = [
    { action: "Connecting to client laptop...", status: "connecting" },
    { action: "Opening desktop application...", status: "running" },
    { action: "Processing PDF upload...", status: "running" },
    { action: "Data entry completed!", status: "completed" },
  ];

  useEffect(() => {
    if (isAutomationRunning) {
      const interval = setInterval(() => {
        setAutomationStep((prev) => {
          if (prev >= automationSteps.length - 1) {
            setIsAutomationRunning(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAutomationRunning]);

  const startDemo = () => {
    setIsAutomationRunning(true);
    setAutomationStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Logo className="w-auto h-8" width={120} height={32} />
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-[#0047D9] transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#industries"
                className="text-slate-600 hover:text-[#0047D9] transition-colors font-medium"
              >
                Industries
              </a>
              <a
                href="#demo"
                className="text-slate-600 hover:text-[#0047D9] transition-colors font-medium"
              >
                Demo
              </a>
            </div>
            <div className="flex space-x-4">
              <Button size="sm" onClick={() => setIsContactModalOpen(true)}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-slate-50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              heroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge variant="outline" className="mb-8">
              <Network className="w-4 h-4 mr-2" />
              Remote Desktop Automation Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-slate-900">Make Automation As Easy As</span>
              <span className="text-[#0047D9] block">One Click</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Control and automate desktop applications on your client machines
              remotely. Perfect for manufacturing, data entry, and desktop
              workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" onClick={() => setIsContactModalOpen(true)}>
                Try rAIgine Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {/* <Button variant="outline" size="lg">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button> */}
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                <span className="text-slate-700">Remote execution</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                <span className="text-slate-700">Any desktop app</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                <span className="text-slate-700">One-click automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="features"
        ref={workflowRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              workflowInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              How Remote Automation Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect once, automate forever. Control your client machines from
              our web platform.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
              workflowInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              {
                icon: Network,
                title: "1. Connect Client Machine",
                description:
                  "Install our lightweight agent on employee laptops and desktop computers",
                color: "#0047D9",
              },
              {
                icon: MousePointer,
                title: "2. One-Click from Web",
                description:
                  "Trigger automation scripts directly from our web platform with a single click",
                color: "#059669",
              },
              {
                icon: Cpu,
                title: "3. Execute on Remote PC",
                description:
                  "Scripts run on the client machine, automating desktop apps and data entry tasks",
                color: "#DC2626",
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Automation Demo */}
      <section
        ref={automationRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              automationInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Live Automation Demo
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Watch how we automate desktop applications remotely in real-time
            </p>
          </div>

          <div
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-300 ${
              automationInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 text-slate-900">
                Manufacturing Data Entry Automation
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  "Remote control of employee workstations",
                  "Automate desktop application workflows",
                  "PDF upload and image processing",
                  "Real-time execution monitoring",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={startDemo}
                disabled={isAutomationRunning}
                size="lg"
                className="w-full sm:w-auto"
              >
                {isAutomationRunning
                  ? "Running Automation..."
                  : "Start Live Demo"}
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <Card className="bg-white border-2 border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-slate-900 flex items-center">
                  <Monitor className="w-6 h-6 mr-3 text-[#0047D9]" />
                  Client Machine - Manufacturing PC
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Mock Desktop Interface */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-300">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-300 ml-2">
                        Manufacturing App v2.1
                      </span>
                    </div>

                    <div className="space-y-3">
                      {automationSteps
                        .slice(0, isAutomationRunning ? automationStep + 1 : 1)
                        .map((step, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 animate-fade-in"
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === automationStep && isAutomationRunning
                                  ? "bg-yellow-400 animate-pulse"
                                  : index < automationStep ||
                                    !isAutomationRunning
                                  ? "bg-green-400"
                                  : "bg-slate-500"
                              }`}
                            ></div>
                            <span
                              className={`text-sm ${
                                index === automationStep && isAutomationRunning
                                  ? "text-yellow-300"
                                  : index < automationStep ||
                                    !isAutomationRunning
                                  ? "text-green-300"
                                  : "text-slate-400"
                              }`}
                            >
                              {step.action}
                            </span>
                          </div>
                        ))}
                    </div>

                    {!isAutomationRunning && (
                      <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-300">
                            Ready for automation
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connection Status */}
                  <div className="flex items-center justify-between text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                    <span className="text-slate-700 font-medium">
                      Connection Status:
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 font-semibold">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries & Use Cases */}
      <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Industries We Serve
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From manufacturing to healthcare, we automate desktop workflows
              across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "Manufacturing",
                description:
                  "Automate data entry for production systems, inventory management, and quality control processes",
                examples: [
                  "Production data entry",
                  "Inventory updates",
                  "Quality reports",
                ],
                color: "#0047D9",
              },
              {
                icon: FileText,
                title: "Document Processing",
                description:
                  "Convert images to PDFs, automate document uploads, and process forms across desktop applications",
                examples: [
                  "PDF from images",
                  "Form automation",
                  "Document scanning",
                ],
                color: "#059669",
              },
              {
                icon: Database,
                title: "Data Entry Services",
                description:
                  "Eliminate manual data entry with automated workflows that work with any desktop application",
                examples: [
                  "ERP data entry",
                  "CRM updates",
                  "Report generation",
                ],
                color: "#DC2626",
              },
              {
                icon: BarChart3,
                title: "Financial Services",
                description:
                  "Automate financial data processing, report generation, and compliance documentation",
                examples: [
                  "Financial reports",
                  "Compliance docs",
                  "Data validation",
                ],
                color: "#7C3AED",
              },
              {
                icon: Users,
                title: "HR & Administration",
                description:
                  "Streamline employee onboarding, document processing, and administrative tasks",
                examples: [
                  "Employee onboarding",
                  "Document processing",
                  "Time tracking",
                ],
                color: "#EC4899",
              },
              {
                icon: Settings,
                title: "Custom Applications",
                description:
                  "Automate any desktop application or legacy system with custom script development",
                examples: ["Legacy systems", "Custom apps", "Desktop tools"],
                color: "#10B981",
              },
            ].map((industry, index) => (
              <Card key={index}>
                <CardHeader>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                    style={{ backgroundColor: industry.color }}
                  >
                    <industry.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {industry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="space-y-2">
                    {industry.examples.map((example, exampleIndex) => (
                      <div
                        key={exampleIndex}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: industry.color }}
                        ></div>
                        <span className="text-sm text-slate-500">
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Remote Automation - Completely Redesigned */}
      <section
        ref={benefitsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0047D9] to-[#003BB8]"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Why Choose rAIgine?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Enterprise-grade automation that transforms how your business
              operates
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Key Statistics */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {[
                {
                  number: "500%",
                  label: "Productivity Increase",
                  icon: TrendingUp,
                },
                {
                  number: "24/7",
                  label: "Automation Availability",
                  icon: Clock,
                },
                {
                  number: "99.9%",
                  label: "Execution Success Rate",
                  icon: Award,
                },
                { number: "< 5min", label: "Setup Time", icon: Zap },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
                >
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Execution",
                  description:
                    "Run automation scripts on remote machines instantly from our web platform",
                },
                {
                  icon: Monitor,
                  title: "Universal Compatibility",
                  description:
                    "Control any desktop application - from legacy systems to modern software",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description:
                    "Bank-grade encryption with full audit trails and compliance reporting",
                },
                {
                  icon: Network,
                  title: "Scalable Architecture",
                  description:
                    "From single machines to thousands of endpoints, scales with your business",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Ready to Automate Your Desktop Workflows?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join manufacturing companies and businesses already automating with
            rAIgine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setIsContactModalOpen(true)}>
              Schedule Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* <Button variant="outline" size="lg">
              Schedule Demo
            </Button> */}
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Quick setup • Secure connection • Works with any desktop app
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo className="w-auto h-8" width={120} height={32} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Remote desktop automation platform for modern businesses.
              </p>
            </div>

            {[
              {
                title: "",
                links: [
                  // "Remote Automation",
                  // "Desktop Control",
                  // "Script Library",
                  // "Integrations",
                ],
              },
              {
                title: "",
                links: [
                  // "Manufacturing",
                  // "Healthcare",
                  // "Finance",
                  // "Retail"
                ],
              },
              {
                title: "Support",
                links: [
                  // "Documentation",
                  // "API Reference",
                  // "Status",
                  "Contact Us",
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4 text-white">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => {
                          if (link === "Contact Us") {
                            setIsContactModalOpen(true);
                          }
                        }}
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 rAIgine. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 71, 217, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 71, 217, 0.5);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 71, 217, 0.7);
        }
      `}</style>
    </div>
  );
};

export default rAIgineLanding;
