"use client"

import Aurora from "@/components/reactbits/Aurora";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Mail, Moon, RectangleEllipsis, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onChange'
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("/home");
  }
  const { theme, setTheme } = useTheme();

  const dark = theme === "dark";

  return (
    <div className="h-screen relative">
      <Aurora speed={1.5} colorStops={["#d3fa85", "#aef129", "#d3fa85"]} />
        <div className="absolute inset-0">
          <div className="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#333842_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div></div>
        </div>
      </div>
      <Card className="h-[450px] w-[350px] absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col border-none">
        <CardHeader className="flex flex-col items-center">
          {dark ? (
            <Image src="/Bulkee-dark.png" alt="Logo" width={130} height={120} />
          ) : (
            <Image src="/Bulkee-light.png" alt="Logo" width={130} height={120} />
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col items-center space-y-6"
            >
              <div className="w-full space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email"
                            className="w-full pl-7"
                          />
                          <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                            <Mail size={16} />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-7"
                          />
                          <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                            <RectangleEllipsis size={16} />
                          </span>

                          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
                            {showPassword ? (
                              <Eye size={16} onClick={() => setShowPassword(false)} />
                            ) : (
                              <EyeClosed size={16} onClick={() => setShowPassword(true)} />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>

          <CardFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
