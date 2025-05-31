'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        An unexpected error has occurred. We apologisze for the inconvenience.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
