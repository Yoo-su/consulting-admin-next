MAX_RETRIES=3
RETRY_DELAY=10

attempt=1

while [ $attempt -le $MAX_RETRIES ]; do
  echo "Attempt $attempt: Running npm run build..."
  npm run build

  if [ -f .next/BUILD_ID ]; then
    echo "Build succeeded and BUILD_ID found."
    exit 0
  else
    echo "BUILD_ID not found. Retrying in $RETRY_DELAY seconds..."
    sleep $RETRY_DELAY
  fi

  attempt=$((attempt + 1))
done

echo "Build failed after $MAX_RETRIES attempts."
exit 1
