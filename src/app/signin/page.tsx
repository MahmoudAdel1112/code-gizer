import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import techImage from "@/public/computer-program-coding-screen.jpg";
import { redirect } from "next/navigation"; // Import redirect from next/navigation

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Sign In Card */}
      <div className="relative flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]"
          )}
        />
        <Card className="w-[380px] shadow-xl z-10 bg-white dark:bg-gray-800 animate-fade-in">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="CodeRate Logo"
                width={100}
                height={40}
              />
            </div>
            <CardTitle className="text-center text-2xl">
              Welcome to CodeRate
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/dashboard" }); // Pass redirectTo option
              }}
              className="flex flex-col items-center space-y-6"
            >
              <Button
                type="submit"
                className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="Sign in with GitHub"
              >
                Sign in with GitHub
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Image with Quote */}
      <div className="flex-1 relative hidden lg:flex items-center justify-center">
        <div className="h-full w-full relative">
          <Image
            src={techImage}
            alt="Developer workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 to-black/60 flex items-center justify-center p-10">
            <blockquote className="text-white text-3xl max-w-xl text-center font-semibold animate-fade-in-delay">
              "CodeRate helped me become a better developer by giving me instant
              feedback on my projects!"
              <footer className="mt-4 text-gray-200 text-base">
                — Happy User
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
