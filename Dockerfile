FROM node:18

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy source code
COPY backend/ ./backend/

# Expose port
EXPOSE 3001

# Start the server
CMD ["sh", "-c", "cd backend && npm start"]