FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite dev server
# --host 0.0.0.0 is required so you can access it from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]