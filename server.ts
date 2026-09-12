import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.office365.com";
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const isSecure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "accounting@bebeslandscaping.com";
  const pass = process.env.SMTP_PASS || "Covid-191817!!";

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Health check API
  app.get("/api/health", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API route for sending emails
  app.post("/api/send-email", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const { to, subject, html, text, attachments } = req.body;

      if (!to || !subject) {
        return res.status(400).json({ error: "Missing required fields: 'to' and 'subject'." });
      }

      const smtpUser = process.env.SMTP_USER || "accounting@bebeslandscaping.com";
      const smtpFrom = process.env.SMTP_FROM || `"TD Insurance" <${smtpUser}>`;

      const mailOptions: any = {
        from: smtpFrom,
        replyTo: '"TD Insurance" <Infoclient.west@melochemonnex.com>',
        to,
        subject,
      };

      if (html) {
        mailOptions.html = html;
      }
      if (text) {
        mailOptions.text = text;
      }
      if (attachments && Array.isArray(attachments) && attachments.length > 0) {
        mailOptions.attachments = attachments;
      }

      const transporter = getTransporter();
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully: %s", info.messageId);

      return res.status(200).json({ 
        success: true, 
        messageId: info.messageId,
        response: info.response 
      });
    } catch (error: any) {
      console.error("Error sending email via SMTP:", error);
      
      let errorMsg = error.message || "Failed to send email via SMTP.";
      if (error.code === 'EAUTH' || error.responseCode === 535) {
        errorMsg = `SMTP Authentication failed (535): Invalid credentials or Basic Auth is disabled on the mailbox. (Account: ${process.env.SMTP_USER || 'accounting@bebeslandscaping.com'})`;
      } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET') {
        errorMsg = `SMTP Connection Timeout (${error.code}): Could not connect to mail server on port ${process.env.SMTP_PORT || 587}.`;
      }

      return res.status(500).json({ 
        error: errorMsg, 
        details: error.message,
        code: error.code,
        responseCode: error.responseCode
      });
    }
  });

  // Catch-all for API routes to always return JSON errors rather than HTML fallback
  app.all("/api/*", (req, res) => {
    res.status(404).setHeader("Content-Type", "application/json").json({
      error: `API endpoint not found: ${req.method} ${req.originalUrl}`
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
