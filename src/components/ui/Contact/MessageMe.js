"use client"

const MessageMe = () => {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "8a558ffb-cf4c-45bf-bdd0-f6850d928b7e");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    });
    const result = await response.json();
    if (result.success) {
      alert("Message sent");
    }
  }

  return (
    <section className="w-4/5 py-2 mx-auto">
      <h3 className="section-subheading">Write me your project</h3>
      <form onSubmit={handleSubmit} className="contact-message-to-me">
        <fieldset>
          <legend className="text-left ml-5 px-2">Name:</legend>
          <input name="name" type="text" placeholder="Insert your name" required />
        </fieldset>
        <fieldset>
          <legend className="text-left ml-5 px-2">Email:</legend>
          <input name="email" type="email" placeholder="Insert your email" required />
        </fieldset>
        <fieldset>
          <legend className="text-left ml-5 px-2">Message:</legend>
          <textarea className="-mb-1 pt-2 ml-4 h-48 rounded-2xl outline-none bg-transparent w-[calc(100%-16px)]" name="message" type="textarea" placeholder="Feel free to write me a message" required />
        </fieldset>
        <button className="py-5 px-6 mt-5 rounded-xl font-semibold text-lg group hover:shadow-2xl duration-300 bg-gray-700 hover:bg-white text-white hover:text-black" type="submit">Send Message
          <svg className="fill-white group-hover:fill-black duration-300 inline ml-1 pb-1" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M20.56 3.34a1 1 0 0 0-1-.08l-17 8a1 1 0 0 0-.57.92 1 1 0 0 0 .6.9L8 15.45v6.72L13.84 18l4.76 2.08a.93.93 0 0 0 .4.09 1 1 0 0 0 .52-.15 1 1 0 0 0 .48-.79l1-15a1 1 0 0 0-.44-.89zM18.1 17.68l-5.27-2.31L16 9.17l-7.65 4.25-2.93-1.29 13.47-6.34z"></path></svg>
        </button>
      </form>
    </section>
  );
};

export default MessageMe;