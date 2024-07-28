import MessageMe from "@/components/ui/Contact/MessageMe";
import TalkToMe from "@/components/ui/Contact/TalkToMe";
import Link from "next/link";

const ContactSection = () => {
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);

  //   formData.append("access_key", "8a558ffb-cf4c-45bf-bdd0-f6850d928b7e");

  //   const object = Object.fromEntries(formData);
  //   const json = JSON.stringify(object);

  //   const response = await fetch("https://api.web3forms.com/submit", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: json
  //   });
  //   const result = await response.json();
  //   if (result.success) {
  //     console.log(result);
  //   }
  // }




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