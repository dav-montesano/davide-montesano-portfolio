import svgPaths from "./icons/mailIconPaths";
import { cn } from "./ui/utils";

type ContainerHelperProps = {
  additionalClassNames?: string;
};

function ContainerHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerHelperProps>) {
  return (
    <div style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties} className={cn("absolute flex items-center justify-center", additionalClassNames)}>
      {children}
    </div>
  );
}

function IconWrapper({ children, viewBox = "0 0 91 91", className }: React.PropsWithChildren<{ viewBox?: string; className?: string }>) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <svg className="block w-[65%] h-[65%] md:w-[80%] md:h-[80%]" fill="none" preserveAspectRatio="none" viewBox={viewBox}>
        {children}
      </svg>
    </div>
  );
}

export function ContactCard() {
  return (
    <div className="@container bg-white relative rounded-[36px] w-full h-full overflow-hidden" data-name="Container">
      {/* Mail Icon */}
      {/* Anchored to bottom-left with responsive sizing using clamp() to strictly prevent overlap */}
      <ContainerHelper additionalClassNames="z-50 bottom-[min(8px,4cqmin)] left-[min(32px,10cqmin)] w-[36%] md:w-[clamp(60px,35%,117px)] aspect-square cursor-pointer">
        <div 
          onClick={(e) => { 
            e.stopPropagation();
            window.location.href = "mailto:dav.montesano@gmail.com"; 
          }}
          className="pointer-events-auto flex-none rotate-[338.877deg] block hover:scale-110 transition-transform duration-300 w-full h-full"
        >
          <IconWrapper viewBox="0 0 91 91" className="translate-y-[15%] md:translate-y-0">
            <g id="mail_icon">
              <path d={svgPaths.p358554f0} fill="currentColor" className="text-black" />
            </g>
          </IconWrapper>
        </div>
      </ContainerHelper>
      
      {/* LinkedIn Icon */}
      {/* Anchored to bottom-right with responsive sizing using clamp() to strictly prevent overlap */}
      <ContainerHelper additionalClassNames="bottom-[min(12px,5cqmin)] right-[min(32px,10cqmin)] w-[33%] md:w-[clamp(55px,32%,109px)] aspect-square pointer-events-none">
        <a href="https://www.linkedin.com/in/davide-montesano/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto flex-none rotate-[18.374deg] block hover:scale-110 transition-transform duration-300 w-full h-full">
          <IconWrapper viewBox="0 0 86.6628 86.6628" className="translate-y-[10%] md:translate-y-0">
            <g id="linkedin_icon">
              <path d={svgPaths.p392bf600} fill="currentColor" className="text-black" />
            </g>
          </IconWrapper>
        </a>
      </ContainerHelper>

      {/* "Contact me" Badge */}
      <div className="absolute bg-[#f3f2f2] flex items-center justify-center left-1/2 -translate-x-1/2 top-[min(24px,8cqmin)] px-[min(16px,5cqmin)] py-[min(8px,2.5cqmin)] rounded-full pointer-events-none" data-name="Link">
        <p className="font-medium leading-[20px] text-[#171717] text-[min(12px,4cqmin)] whitespace-nowrap tracking-[-0.15px]">Find me on</p>
      </div>
    </div>
  );
}
