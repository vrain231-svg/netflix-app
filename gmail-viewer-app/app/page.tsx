import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import EmailTabs from "@/components/emails/email-tabs";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <div className="flex-1 p-4 md:p-6">
          <EmailTabs />
        </div>
      </div>
    </main>
  );
}