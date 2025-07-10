import { motion } from "framer-motion";
import { CloudUpload, Lock, RefreshCcw, Fingerprint } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CardSpotlight } from "./card-spotlight";

const features = [
  {
    name: "Instant AI Code Reviews",
    description:
      "Receive immediate, AI-powered feedback on your GitHub repositories to enhance code quality and identify critical issues efficiently.",
    icon: CloudUpload,
  },
  {
    name: "Secure GitHub Integration",
    description:
      "Connect seamlessly with GitHub using encrypted authentication, ensuring your code and data remain protected at all times.",
    icon: Lock,
  },
  {
    name: "Real-Time Learning Insights",
    description:
      "Gain actionable coding tips and best practices tailored for learners and developers to improve skills with every review.",
    icon: RefreshCcw,
  },
  {
    name: "Advanced Code Analysis",
    description:
      "Leverage sophisticated AI algorithms to detect complex errors and suggest optimizations, supporting both novice and experienced coders.",
    icon: Fingerprint,
  },
];

export default function Features() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-950  py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-base font-semibold text-primary relative inline-block mb-3">
            Enhance Your Coding
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"
            />
          </h2>
          <p className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-balance">
            Tools to Elevate Your Development Workflow
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover how CodeRate empowers developers and learners with
            AI-driven insights and seamless GitHub integration.
          </p>
        </motion.div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <CardSpotlight>
                  <div className="flex size-12 items-center justify-center rounded-md bg-black ">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>

                  <h2 className="text-semibold text-lg my-2">{feature.name}</h2>

                  <p className="text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
