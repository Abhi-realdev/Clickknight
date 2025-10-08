import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ message = "Loading...", size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="text-center py-8" data-testid="loading-spinner">
      <Loader2 className={`${sizeClasses[size]} animate-spin mx-auto mb-4 text-primary`} />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
