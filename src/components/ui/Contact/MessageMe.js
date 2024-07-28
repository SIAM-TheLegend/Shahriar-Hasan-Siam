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
          {/* <svg className="fill-white group-hover:fill-black duration-300 inline ml-1 pb-1" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M20.56 3.34a1 1 0 0 0-1-.08l-17 8a1 1 0 0 0-.57.92 1 1 0 0 0 .6.9L8 15.45v6.72L13.84 18l4.76 2.08a.93.93 0 0 0 .4.09 1 1 0 0 0 .52-.15 1 1 0 0 0 .48-.79l1-15a1 1 0 0 0-.44-.89zM18.1 17.68l-5.27-2.31L16 9.17l-7.65 4.25-2.93-1.29 13.47-6.34z"></path></svg> */}
          {/* <svg className="fill-white group-hover:fill-black duration-300 inline ml-1 pb-1" height="24" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 293.815 293.815" xmlSpace="preserve"><g><path d="M37.422,176.387c1.561,1.615,3.965,2.11,6.021,1.229l89.989-38.003l-67.939,42.332c-1.594,0.995-2.562,2.736-2.562,4.618v38.378c0,7.593,1.071,14.082,3.1,18.759c3.486,8.044,8.926,9.241,11.857,9.241c3.546,0,7.049-1.653,10.405-4.917l12.929-12.575l18.993,13.146c4.743,3.285,10.459,5.015,16.529,5.015c12.532,0,25.498-7.321,33.853-19.102L287.254,69.896c8.039-11.346,7.239-18.531,5.156-22.556c-1.376-2.665-5.064-7.136-14.267-7.136c-3.057,0-6.521,0.495-10.312,1.463L21.463,104.624c-10.992,2.807-18.335,8.931-20.69,17.236c-2.35,8.311,0.696,17.372,8.583,25.52L37.422,176.387z M11.243,124.825c1.251-4.422,5.836-7.854,12.912-9.66l246.373-62.963c6.625-1.686,11.656-0.979,12.227,0.136c0.528,1.017,0.294,4.683-4.373,11.27L161.731,228.221c-6.347,8.953-15.92,14.511-24.982,14.511c-3.905,0-7.381-1.033-10.334-3.079l-22.675-15.697c-0.941-0.647-2.018-0.968-3.095-0.968c-1.376,0-2.747,0.522-3.791,1.539l-16.138,15.697c-1.871,1.817-2.817,1.838-2.823,1.844c-1.044-0.326-4.079-5.167-4.079-17.128v-35.359l123.837-77.164c2.404-1.496,3.258-4.601,1.947-7.12c-1.305-2.535-4.362-3.606-6.94-2.507L42.649,166.145l-25.477-26.331C12.097,134.572,9.987,129.247,11.243,124.825z" /></g></svg> */}
          <svg className="ml-1 -mt-1 pb-1 fill-white rotate-90 group-hover:fill-gray-900 duration-300 inline" height="26" width="26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.935 51.935"><path d="M47.456,18.024c-3.776-2.707-9.4-6.337-16.573-9.823c-8.311-4.039-17.495-6.61-23.575-8.03C3.55-0.707,0.568,1.896,0.826,5.746c0.431,6.427,1.323,16.028,3.081,23.221c1.584,6.483,4.244,13.051,6.326,17.664c1.586,3.518,4.875,6.038,6.923,5.11c1.018-0.461,2.21-1.101,3.548-1.99c1.575-1.048,2.953-2.278,4.081-3.44c2.059-2.119,5.777-2.384,8.746-0.214c2.968,2.168,5.374,0.798,5.374-3.061v-4.627c0-3.858,2.008-6.935,4.347-7.601c1.272-0.362,2.673-0.935,3.981-1.842c1.304-0.902,2.388-1.971,3.249-2.983C52.065,24.123,50.592,20.273,47.456,18.024z M36.705,42.746c0,1.286-0.821,1.687-1.836,0.896l-6.765-3.05c-1.015-0.791-2.423-2.294-3.148-3.356L6.014,6.479C5.288,5.417,5.489,5.239,6.46,6.081l28.483,24.66c0.973,0.843,1.761,2.568,1.761,3.854L36.705,42.746L36.705,42.746z" /></svg>
        </button>
      </form>
    </section>
  );
};

export default MessageMe;