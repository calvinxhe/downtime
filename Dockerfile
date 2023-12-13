# Use the same base image as before
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
# No need to run npm run build for dev

# Start the Next.js development server
FROM node:18
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "dev"]
