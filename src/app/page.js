export default function Home() {
  return (
    <div className="bg-gray-300">
      <a href="#" className="group">
        <svg className="size-10 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="mouse">
          <g>
            <path d="M16,2a9.01,9.01,0,0,0-9,9V21a9,9,0,0,0,18,0V11A9.01,9.01,0,0,0,16,2Zm7,19A7,7,0,0,1,9,21V11a7,7,0,0,1,14,0Z"></path>
            <path className="-translate-y-[1px] group-hover:translate-y-[3px] transition duration-300 animate-[mouseScroll_1s_ease-in-out_infinite]" d="M16,8a1,1,0,0,0-1,1v5a1,1,0,0,0,2,0V9A1,1,0,0,0,16,8Z"></path>
          </g>
        </svg> Scroll Below</a>
    </div>
  );
}
