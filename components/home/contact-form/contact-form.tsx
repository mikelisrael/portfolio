import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AnimatedUpComponent } from "@/components/general/animated-components";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValue = z.infer<typeof formSchema>;

const ContactForm = () => {
  const defaultValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValue) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-7 md:space-y-10">
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
                  <Input
                    type="text"
                    //   disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
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
                  <Input
                    type="text"
                    //   disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
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
                  <Textarea
                    //   disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </AnimatedUpComponent>
      </form>
    </Form>
  );
};

export default ContactForm;
