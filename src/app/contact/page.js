import MessageMe from "@/components/ui/Contact/MessageMe";
import TalkToMe from "@/components/ui/Contact/TalkToMe";

export const metadata = {
  title: "Contact - Shahriar Hasan Siam",
  description: "Contact page Shahriar Hasan Siam",
};

const ContactSection = () => {
  return (
    <section className="text-center bg-[#eeeeee] py-10">
      <h2 className="section-heading">Contact Me</h2>
      <p className="section-text">Get In touch</p>

      <div className="grid grid-cols-2">
        <TalkToMe />
        <MessageMe />
      </div>
    </section>
  );
};

export default ContactSection;