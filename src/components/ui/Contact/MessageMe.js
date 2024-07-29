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
      alert("Message sent successfully");
      
      // return (
      //   <>
      //   </>
      // );
    }
  }

  return (
    <section className="w-4/5 py-2 mx-auto">
      <h3 className="section-subheading">Write me your project</h3>
      <form onSubmit={handleSubmit} className="contact-message-to-me">
        <fieldset>
          <legend>Name:</legend>
          <input name="name" type="text" placeholder="Insert your name" title="" required />
        </fieldset>
        <fieldset>
          <legend>Email:</legend>
          <input name="email" type="email" placeholder="Insert your email" title="" required />
        </fieldset>
        <fieldset>
          <legend>Message:</legend>
          <textarea className="-mb-1 pt-2 ml-4 h-48 rounded-2xl outline-none bg-transparent w-[calc(100%-16px)]" title="" name="message" type="textarea" placeholder="Feel free to write me a message" required />
        </fieldset>
        <button className="py-5 px-6 mt-4 rounded-xl font-semibold text-lg group hover:border hover:border-gray-400 hover:shadow-2xl duration-300 bg-gray-700 hover:bg-white text-white hover:text-black" type="submit">Send Message
          <svg className="ml-1 -mt-1 pb-1 fill-white rotate-90 group-hover:fill-gray-900 duration-300 inline" height="26" width="26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.935 51.935"><path d="M47.456,18.024c-3.776-2.707-9.4-6.337-16.573-9.823c-8.311-4.039-17.495-6.61-23.575-8.03C3.55-0.707,0.568,1.896,0.826,5.746c0.431,6.427,1.323,16.028,3.081,23.221c1.584,6.483,4.244,13.051,6.326,17.664c1.586,3.518,4.875,6.038,6.923,5.11c1.018-0.461,2.21-1.101,3.548-1.99c1.575-1.048,2.953-2.278,4.081-3.44c2.059-2.119,5.777-2.384,8.746-0.214c2.968,2.168,5.374,0.798,5.374-3.061v-4.627c0-3.858,2.008-6.935,4.347-7.601c1.272-0.362,2.673-0.935,3.981-1.842c1.304-0.902,2.388-1.971,3.249-2.983C52.065,24.123,50.592,20.273,47.456,18.024z M36.705,42.746c0,1.286-0.821,1.687-1.836,0.896l-6.765-3.05c-1.015-0.791-2.423-2.294-3.148-3.356L6.014,6.479C5.288,5.417,5.489,5.239,6.46,6.081l28.483,24.66c0.973,0.843,1.761,2.568,1.761,3.854L36.705,42.746L36.705,42.746z" /></svg>
        </button>
      </form>
    </section>
  );
};

export default MessageMe;