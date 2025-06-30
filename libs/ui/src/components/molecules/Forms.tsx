"use client";
import { BaseComponent } from "../../lib/types";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { Button } from "../atoms/button";
import { toast } from "sonner";

export type FormState = {
    data: string | null;
    error: Record<string, string> | null; // or you can use string[] if it's simpler
};

export interface IFormProps extends BaseComponent {
    action: (prevState: FormState, formData: FormData) => Promise<FormState>;
    submitButtonText?: string;
}
interface DisplayErrorsProps {
    errors: Record<string, string>;
}

const DisplayErrors: React.FC<DisplayErrorsProps> = ({ errors }) => {
    return (
        <ul className="space-y-1 text-sm text-red-600">
            {Object.entries(errors).map(([field, message]) => (
                <li key={field}>
                    <strong>{field}</strong>: {message}
                </li>
            ))}
        </ul>
    );
};

export const Form = ({ action, submitButtonText, children }: IFormProps) => {
    const [state, formAction] = useFormState(action, {
        data: null,
        error: null,
    });
    const ref = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (state.data) {
            ref.current?.reset();
            toast(state.data);
        }
    }, [state, toast]);

    return (
        <form ref={ref} action={formAction} className="space-y-2">
            {children}
            {state.error ? <DisplayErrors errors={state.error} /> : null}
            <Button className="w-full">{submitButtonText}</Button>
        </form>
    );
};
