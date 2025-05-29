import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Custom404() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the App Router's not-found page
    router.replace('/not-found');
  }, [router]);
  
  return null;
}
