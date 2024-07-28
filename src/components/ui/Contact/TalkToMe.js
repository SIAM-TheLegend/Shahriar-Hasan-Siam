import Link from "next/link";

const TalkToMe = () => {
  return (
    <section>
      <h3 className="section-subheading">Talk to me</h3>
      <div className="py-6">
        <div className="my-3 py-4 bg-white w-5/12 mx-auto rounded-2xl border border-gray-400">
          <svg className="mx-auto mt-2 mb-1" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill='#333333'><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>
          <h4 className=" font-semibold text-black text-xl">Email</h4>
          <p className="mb-3 font-semibold">siamshahriarhasan@gmail.com</p>
          <Link className="text-md text-base text-black font-semibold" href="https://www.facebook.com">Text me <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="black"><path className="hover:translate-x-5" d="M4 6h2v12H4zm4 7h8.586l-4.293 4.293 1.414 1.414L20.414 12l-6.707-6.707-1.414 1.414L16.586 11H8z"></path></svg></Link>
        </div>
        <div className="my-3 py-4 bg-white w-5/12 mx-auto rounded-2xl border border-gray-400">
          <svg className="mx-auto mt-2 mb-1" xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24" fill='#333333'><path d="M12 3c-4.92 0-8.91 3.729-8.91 8.332 0 2.616 1.291 4.952 3.311 6.479V21l3.041-1.687c.811.228 1.668.35 2.559.35 4.92 0 8.91-3.73 8.91-8.331C20.91 6.729 16.92 3 12 3zm.938 11.172-2.305-2.394-4.438 2.454 4.865-5.163 2.305 2.395 4.439-2.455-4.866 5.163z"></path></svg>
          <h4 className=" font-semibold text-black text-xl">Messenger</h4>
          <p className="mb-3 font-semibold">m.me/Siam.TheLegend</p>
          <Link className="text-md text-base text-black font-semibold" href="https://www.facebook.com">Text me <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="black"><path className="hover:translate-x-5" d="M4 6h2v12H4zm4 7h8.586l-4.293 4.293 1.414 1.414L20.414 12l-6.707-6.707-1.414 1.414L16.586 11H8z"></path></svg></Link>
        </div>
        <div className="my-3 py-4 bg-white w-5/12 mx-auto rounded-2xl border border-gray-400">
          <svg className="mx-auto mt-1 mb-1" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill='#333333'><path fill-rule="evenodd" clip-rule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path></svg>
          <h4 className=" font-semibold text-black text-xl">WhatsApp</h4>
          <p className="mb-3 font-semibold">+880 1972005986</p>
          <Link className="text-md text-base text-black font-semibold" href="https://www.facebook.com">Text me <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="black"><path className="hover:translate-x-5" d="M4 6h2v12H4zm4 7h8.586l-4.293 4.293 1.414 1.414L20.414 12l-6.707-6.707-1.414 1.414L16.586 11H8z"></path></svg></Link>
        </div>
      </div>
    </section>
  );
};

export default TalkToMe;