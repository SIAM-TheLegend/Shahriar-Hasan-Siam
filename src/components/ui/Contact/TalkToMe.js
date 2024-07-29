import Link from "next/link";

const TalkToMe = () => {
  return (
    <section>
      <h3 className="section-subheading">Talk to me</h3>
      <div className="py-6 contact-talk-to-me">
        <div className="my-3 py-4 bg-white w-5/12 mx-auto rounded-2xl border border-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
            <path d="M2 5.5L8.91302 9.41697C11.4616 10.861 12.5384 10.861 15.087 9.41697L22 5.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M21.9953 10.0284C21.9299 6.96114 21.8972 5.42749 20.7655 4.29141C19.6337 3.15532 18.0586 3.11574 14.9083 3.03659C12.9668 2.98781 11.0443 2.9878 9.10276 3.03658C5.95252 3.11573 4.3774 3.1553 3.24564 4.29139C2.11389 5.42748 2.08118 6.96113 2.01577 10.0284C1.99474 11.0147 1.99474 11.9951 2.01577 12.9814C2.08119 16.0487 2.11389 17.5823 3.24565 18.7184C4.3774 19.8545 5.95252 19.8941 9.10277 19.9732C9.57102 19.985 10.0382 19.9939 10.5047 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.8522 13.4391L21.5446 14.1315C22.1304 14.7172 22.1304 15.667 21.5446 16.2528L17.9172 19.9484C17.6319 20.2338 17.2669 20.4262 16.8702 20.5002L14.622 20.9883C14.2671 21.0653 13.951 20.7502 14.027 20.395L14.5056 18.1597C14.5796 17.763 14.772 17.398 15.0574 17.1126L18.7309 13.4391C19.3167 12.8533 20.2665 12.8533 20.8522 13.4391Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h4 className=" font-semibold text-black text-xl">Email</h4>
          <p className="mb-3 mt-1 font-semibold text-sm">siamshahriarhasan@gmail.com</p>
          <Link className="group p-3 -mr-3 text-md text-base text-gray-500 font-semibold" href="https://www.facebook.com">Text me
            <svg className="talk-to-me-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75V11.25ZM4 12.75H20V11.25H4V12.75Z" fill="black" />
              <path className="opacity-100 group-hover:opacity-0 duration-300" fill="black" d="M13.25 12.75V18C13.25 18.3034 13.4327 18.5768 13.713 18.6929C13.9932 18.809 14.3158 18.7449 14.5303 18.5304L20.5303 12.5304C20.671 12.3897 20.75 12.1989 20.75 12C20.75 11.8011 20.671 11.6103 20.5303 11.4697L14.5303 5.46969C14.3158 5.25519 13.9932 5.19103 13.713 5.30711C13.4327 5.4232 13.25 5.69668 13.25 6.00002V11.25V12.75Z" />
              <path className="opacity-0 group-hover:opacity-100 duration-300" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M14 6L20 12L14 18" />
            </svg>
          </Link>
        </div>
        <div className="my-3 py-4 bg-white w-5/12 mx-auto rounded-2xl border border-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <h4 className=" font-semibold text-black text-xl">WhatsApp</h4>
          <p className="mb-3 mt-1 font-semibold text-sm">+880 1972005986</p>
          <Link className="group p-3 -mr-3 text-md text-base text-gray-500 font-semibold" href="https://www.facebook.com">Text me
            <svg className="talk-to-me-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75V11.25ZM4 12.75H20V11.25H4V12.75Z" fill="black" />
              <path className="opacity-100 group-hover:opacity-0 duration-300" fill="black" d="M13.25 12.75V18C13.25 18.3034 13.4327 18.5768 13.713 18.6929C13.9932 18.809 14.3158 18.7449 14.5303 18.5304L20.5303 12.5304C20.671 12.3897 20.75 12.1989 20.75 12C20.75 11.8011 20.671 11.6103 20.5303 11.4697L14.5303 5.46969C14.3158 5.25519 13.9932 5.19103 13.713 5.30711C13.4327 5.4232 13.25 5.69668 13.25 6.00002V11.25V12.75Z" />
              <path className="opacity-0 group-hover:opacity-100 duration-300" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M14 6L20 12L14 18" />
            </svg>
          </Link>
        </div>
        <div className="my-3 py-4 bg-white w-5/12 mx-auto rounded-2xl border border-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
            <path d="M7 14L8.9954 11.6055C9.63153 10.8422 9.9496 10.4605 10.3333 10.4605C10.7171 10.4605 11.0351 10.8422 11.6713 11.6055L12.3287 12.3945C12.9649 13.1578 13.2829 13.5395 13.6667 13.5395C14.0504 13.5395 14.3685 13.1578 15.0046 12.3945L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
          <h4 className=" font-semibold text-black text-xl">Messenger</h4>
          <p className="mb-3 mt-1 font-semibold text-sm">m.me/Siam.TheLegend</p>
          <Link className="group p-3 -mr-3 text-md text-base text-gray-500 font-semibold" href="https://www.facebook.com">Text me
            <svg className="talk-to-me-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75V11.25ZM4 12.75H20V11.25H4V12.75Z" fill="black" />
              <path className="opacity-100 group-hover:opacity-0 duration-300" fill="black" d="M13.25 12.75V18C13.25 18.3034 13.4327 18.5768 13.713 18.6929C13.9932 18.809 14.3158 18.7449 14.5303 18.5304L20.5303 12.5304C20.671 12.3897 20.75 12.1989 20.75 12C20.75 11.8011 20.671 11.6103 20.5303 11.4697L14.5303 5.46969C14.3158 5.25519 13.9932 5.19103 13.713 5.30711C13.4327 5.4232 13.25 5.69668 13.25 6.00002V11.25V12.75Z" />
              <path className="opacity-0 group-hover:opacity-100 duration-300" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M14 6L20 12L14 18" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TalkToMe;