export interface EmailMessage {
  id: string;
  email_id: string;
  subject: string;
  sender: string;
  body: string;
  body_snippet: string;
  created_at: string;
}

export interface EmailPayload {
  partId?: string;
  mimeType: string;
  filename?: string;
  headers: EmailHeader[];
  body?: EmailBody;
  parts?: EmailPart[];
}

export interface EmailHeader {
  name: string;
  value: string;
}

export interface EmailBody {
  size: number;
  data?: string;
  attachmentId?: string;
}

export interface EmailPart {
  partId: string;
  mimeType: string;
  filename?: string;
  headers: EmailHeader[];
  body: EmailBody;
  parts?: EmailPart[];
}

export interface EmailListItem {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  fromName: string;
  date: string;
  snippet: string;
  isRead: boolean;
}

export interface EmailDetail extends EmailListItem {
  body: string;
}

export interface Attachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
}