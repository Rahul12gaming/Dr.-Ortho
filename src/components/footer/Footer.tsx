import type { FC } from "react";
const Footer:FC = () => {
  return (
    <footer className="mt-10 bg-black text-white py-10 px-4 md:px-10 flex justify-around flex-col md:flex-row gap-6">
      <div className="flex gap-4 items-center">
         <a href="/">
       <h1 className="font-bold text-xl font-inconsolata">Dr. Ortho</h1>
       </a>
       <span className="text-sm">@2025 copyright</span>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <a href="">Privacy Policy</a>
        <a href="">Terms of Service</a>
        <a href="">Cookie Policy</a>
      </div>

      <div className="flex items-center text-sm text-gray-400 gap-3 ">
       
      
          <a href="">Facebook</a>
          <a href="">Twitter</a>
          <a href="">LinkedIn</a>
        
      </div>
    </footer>
  );
};

export default Footer;

