import { EmailDetail, EmailListItem, EmailMessage } from "@/types/gmail";
import { format } from "date-fns";
import { emailRepo } from "@/repository/mysql-repository";

export function parseEmailListItems(messages: EmailMessage[]): EmailListItem[] {
  return messages.map((message) => {
    const fromHeader = message.sender;
    const subjectHeader = message.subject;
    const dateHeader = message.created_at
    
    const fromValue = fromHeader || "";
    const fromName = fromValue.includes("<") 
      ? fromValue.split("<")[0].trim() 
      : fromValue;
      
    return {
      id: message.id,
      threadId: message.id,
      subject: subjectHeader || "(no subject)",
      from: fromValue,
      fromName,
      date: format(new Date(dateHeader), "MMMM dd yyyy, h:mm a"),
      snippet: message.body_snippet || "",
      isRead: true
    };
  });
}

export function parseEmailDetail(message: EmailMessage): EmailDetail {
  const listItem = parseEmailListItems([message])[0];
  
  return {
    ...listItem,
    body: message.body,
  };
}

export async function getEmails(): Promise<EmailListItem[]> {
  const emails = await emailRepo.findAll();
  return parseEmailListItems(emails);
}

export async function getEmailDetail(id: string): Promise<EmailDetail | null> {
  const message = await emailRepo.findById(id);
  if (!message) return null;
  
  return parseEmailDetail(message);
}