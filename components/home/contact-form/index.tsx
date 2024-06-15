"use client";

import { AnimatedUpComponent } from "@/components/shared/animated-components";
import { buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, emailJSConfig } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useReducer, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";
import { z } from "zod";

const appearMotionProps = {
  initial: { scale: 0, rotate: 180 },
  animate: { rotate: 0, scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  exit: { opacity: 0, rotate: 180, scale: 0 },
};

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValue = z.infer<typeof formSchema>;

const initialState = {
  isSubmitting: false,
  submitted: false,
  defaultValues: {
    email: "",
    message: "",
    name: "",
  },
};

type actionType = { type: "SUBMIT" | "SUBMITTED" | "RESET" | "ERROR" };

function reducer(state: typeof initialState, action: actionType) {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, isSubmitting: true, submitted: false };
    case "SUBMITTED":
      return { ...state, isSubmitting: false, submitted: true };
    case "ERROR":
      return { ...state, isSubmitting: false, submitted: false };
    case "RESET":
      return initialState;
    default:
      throw new Error();
  }
}

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isSubmitting, submitted, defaultValues } = state;
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValue) => {
    dispatch({ type: "SUBMIT" });
    const { serviceID, templateID, publicKey } = emailJSConfig;

    emailjs
      // @ts-ignore
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then((value) => {
        form.reset();
        dispatch({ type: "SUBMITTED" });
        toast.success("Message sent successfully", {
          description: "Hang tight! I will definitely get back to you!",
        });
        setTimeout(() => {
          dispatch({ type: "RESET" });
        }, 5000);
      })
      .catch((error) => {
        dispatch({ type: "ERROR" });
        toast.error("Failed to send message", {
          description: "Please try again later",
        });
      });
  };

  const isFilled = Object.keys(form.formState.dirtyFields).length === 3;
  const isButtonShow = isFilled || submitted;

  return (
    <Form {...form}>
      <form
        ref={formRef}
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7 md:space-y-10"
      >
        <AnimatedUpComponent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-foreground-secondary md:text-lg">
                  What&rsquo;s your name?
                </FormLabel>
                <FormControl>
                  <Input type="text" disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage className="mt-2 text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </AnimatedUpComponent>

        <AnimatedUpComponent>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-foreground-secondary md:text-lg">
                  Your fancy email
                </FormLabel>
                <FormControl>
                  <Input type="email" disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage className="mt-2 text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </AnimatedUpComponent>

        <AnimatedUpComponent>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-foreground-secondary md:text-lg">
                  Tell me about your project?
                </FormLabel>
                <FormControl>
                  <Textarea disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage className="mt-2 text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </AnimatedUpComponent>

        <AnimatePresence>
          {isButtonShow && (
            <motion.button
              type="submit"
              {...appearMotionProps}
              className={cn(
                buttonVariants({ variant: "default" }),
                "text-base text-background md:text-xl",
                submitted && "bg-green-500 text-white disabled:opacity-100",
              )}
              disabled={isSubmitting || submitted}
            >
              {submitted ? (
                <motion.div {...appearMotionProps}>
                  <FaCheck />
                </motion.div>
              ) : isSubmitting ? (
                <VscLoading className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

export default ContactForm;
