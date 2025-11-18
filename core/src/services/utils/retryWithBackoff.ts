// Utility for retrying failed requests with exponential backoff
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000
): Promise<T> {
  let attempt = 1;
  
  while (attempt <= maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      
      // Check if it's a rate limit error
      const isRateLimit = error instanceof Error && 
        (error.message.includes('rate_limit') || error.message.includes('429'));
      
      // Calculate delay with exponential backoff
      const delay = isRateLimit ? 
        baseDelay * Math.pow(2, attempt - 1) : 
        baseDelay;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }
  
  throw new Error('Max retry attempts reached');
}