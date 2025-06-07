FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV production

# Disable Next.js telemetry
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Set correct permissions for nextjs user and don't run as root
RUN addgroup nodejs
RUN adduser -SDH nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the build output from the builder stage

COPY /.next/standalone ./
COPY /.next/static ./.next/static
COPY /public ./public

RUN chown -R nextjs:nodejs ./

USER nextjs

# Exposed port (for orchestrators and dynamic reverse proxies)
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "wget", "-q0", "http://localhost:3000/api/health" ]

# Run the nextjs app
CMD ["node", "server.js"]


