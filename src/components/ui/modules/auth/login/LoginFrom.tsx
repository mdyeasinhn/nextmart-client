"use client";
// Importing necessary components and libraries
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

import { loginUser } from "@/services/AuthServices";
import Logo from "@/app/assets/svg/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginSchema } from "./login.validation";

export default function LoginForm() {
    // Setup form with validation using zod schema
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    // Get form submission state
    const {
        formState: { isSubmitting },
    } = form;



    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            // Send registration data to server
            const res = await loginUser(data);
            if (res?.success) {
                toast.success(res?.message);
            } else {
                toast.error(res?.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-4">
            <div className="border-2 border-gray-300 rounded-xl max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 hover:shadow-xl">
                {/* Logo and heading section */}
                <div className="flex items-center space-x-4 mb-6 transform transition-all duration-300 hover:scale-105">
                    <div className="transition-transform duration-300 hover:rotate-6">
                        <Logo />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Login</h1>
                        <p className="font-extralight text-sm text-gray-600 dark:text-gray-400">
                            Welcame back!
                        </p>
                    </div>
                </div>

                {/* Registration form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">


                        {/* Email input field */}
                        <div className="animate-fade-in delay-100">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                value={field.value || ""}
                                                className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Password input field with show/hide toggle */}
                        <div className="animate-fade-in delay-200">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                    value={field.value || ""}
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                                                />
                                                {/* Button to toggle password visibility */}
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <FontAwesomeIcon icon={faEyeSlash} className="text-sm" />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faEye} className="text-sm" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>



                        {/* Submit button */}
                        <div className="animate-fade-in delay-400 pt-2">
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full py-3 rounded-lg text-base font-semibold shadow-md transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loggin...
                                    </div>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>

                {/* Link to login page for existing users */}
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    Do not have any account?{" "}
                    <Link href="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}