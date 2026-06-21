import { MilanMapWidget } from "./MilanMapWidget";
import { ContactCard } from "./ContactCard";
import { GalleryCard } from "./GalleryCard";
import { motion as Motion } from "motion/react";

export const AboutPage = () => {
  return (
    <Motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-[1100px] mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-[16px] h-auto md:h-[800px]"
    >
      {/* Left Column */}
      <div className="flex flex-col gap-[16px] h-full">
        {/* Intro Text Card - Takes remaining space */}
        <div className="@container flex-1 bg-white relative rounded-[36px] w-full overflow-hidden" data-name="Container">
          <div className="flex flex-col items-center w-full h-full">
            <div className="content-stretch flex flex-col gap-[16px] items-center px-[min(32px,10cqmin)] py-[min(24px,8cqmin)] relative w-full h-auto md:h-full md:min-h-0">
              <div className="bg-[#f3f2f2] flex items-center justify-center px-[min(16px,5cqmin)] py-[min(8px,2.5cqmin)] relative rounded-full shrink-0" data-name="Link">
                <p className="font-sans font-medium leading-[20px] not-italic relative shrink-0 text-[#171717] text-[min(12px,4cqmin)] whitespace-nowrap tracking-[-0.15px]">About</p>
              </div>
              <div className="basis-auto md:basis-0 font-sans font-medium grow leading-[0] min-h-0 not-italic overflow-visible md:overflow-y-auto relative text-[14px] text-black w-full">
                <p className="leading-[1.6] mb-0">I’m <a href="https://www.linkedin.com/in/davide-montesano/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline text-blue-600 hover:opacity-70 transition-opacity">Davide Montesano<svg viewBox="0 0 86.6628 86.6628" className="w-[14px] h-[14px] shrink-0" fill="currentColor"><path d="M74.1055 7.2222C74.7982 7.21431 75.4859 7.34236 76.129 7.60013C76.772 7.85793 77.3581 8.2399 77.8536 8.72415C78.3491 9.2085 78.7442 9.78626 79.0167 10.4234C79.2891 11.0605 79.4336 11.7452 79.4415 12.438L79.4415 74.2261C79.4336 74.9187 79.2889 75.6029 79.0167 76.2398C78.7442 76.8769 78.3491 77.4546 77.8536 77.939C77.3581 78.4233 76.772 78.8052 76.129 79.063C75.4859 79.3208 74.7982 79.4498 74.1055 79.4419L12.5577 79.4419C11.8649 79.4499 11.1773 79.3208 10.5342 79.063C9.89115 78.8052 9.30511 78.4233 8.80963 77.939C8.3141 77.4546 7.91897 76.8769 7.64654 76.2398C7.37423 75.6029 7.22965 74.9188 7.22174 74.2261L7.22174 12.438C7.22959 11.7452 7.37411 11.0605 7.64654 10.4234C7.91897 9.78626 8.3141 9.2085 8.80963 8.72415C9.30509 8.23995 9.8912 7.8579 10.5342 7.60013C11.1773 7.34236 11.8649 7.21428 12.5577 7.2222L74.1055 7.2222ZM17.9327 68.771H28.6456L28.6456 34.3062H17.9327L17.9327 68.771ZM55.9307 33.4624C53.8975 33.3864 51.8816 33.8629 50.0977 34.8413C48.3138 35.8199 46.8285 37.2645 45.7999 39.0201H45.6592L45.6592 34.3052H35.3887L35.3887 68.7495H46.0606V51.6978C46.0606 47.2042 46.9037 42.8511 52.4805 42.8511C58.0574 42.8512 58.0577 47.9874 58.0577 51.9995V68.7701H68.7696V49.8726C68.7696 40.6044 66.7837 33.4624 55.9307 33.4624ZM23.3096 17.2544C21.6604 17.2544 20.0784 17.9096 18.9122 19.0757C17.746 20.2419 17.091 21.8239 17.0909 23.4732C17.0909 24.7031 17.4555 25.9056 18.1387 26.9283C18.8221 27.951 19.7934 28.7486 20.9297 29.2193C22.066 29.6899 23.3163 29.8127 24.5225 29.5728C25.7289 29.3328 26.8374 28.7404 27.7071 27.8706C28.5766 27.001 29.1693 25.8932 29.4092 24.687C29.6492 23.4807 29.5254 22.2297 29.0547 21.0933C28.584 19.9571 27.7873 18.9855 26.7647 18.3023C25.7421 17.619 24.5395 17.2545 23.3096 17.2544Z" /></svg></a>, a Staff Product Designer currently at <a href="https://www.deel.com/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">Deel</a>, with a systems-thinking mindset and a focus on scalable design frameworks and craft.</p>
                <p className="leading-[1.6] mb-0">&nbsp;</p>
                <p className="leading-[1.6] mb-0">My work spans product design, interaction, and design systems. I enjoy building and refining products from early exploration to execution, using design not just to solve problems, but to define direction and shape how products evolve over time.</p>
                <p className="leading-[1.6] mb-0">&nbsp;</p>
                <p className="leading-[1.6] mb-0">I've had over 8 years of industry experience, from working with startups, agencies and international clients from concept to final deliverables.</p>
                <p className="leading-[1.6] mb-0">&nbsp;</p>
                <p className="leading-[1.6] mb-0">How I work:</p>
                <ul className="list-disc">
                  <li className="mb-0 ms-[24px]">
                    <span className="leading-[1.6]">Systems first, interfaces second</span>
                  </li>
                  <li className="mb-0 ms-[24px]">
                    <span className="leading-[1.6]">Clear problem framing before execution</span>
                  </li>
                  <li className="mb-0 ms-[24px]">
                    <span className="leading-[1.6]">Strong bias toward prototyping and iteration</span>
                  </li>
                  <li className="ms-[24px]">
                    <span className="leading-[1.6]">Design as a shared language, not a handoff</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Fixed Height */}
        <div className="h-auto md:h-[240px] grid grid-cols-1 md:grid-cols-2 gap-[16px]">
             {/* Map Block */}
             <div className="w-full aspect-[4/3] md:aspect-auto md:h-full relative rounded-[36px] overflow-hidden isolate shadow-sm border border-white/10">
                <MilanMapWidget />
             </div>

             {/* Socials Block */}
             <div className="w-full aspect-[4/3] md:aspect-auto md:h-full">
                <ContactCard />
             </div>
        </div>
      </div>

      {/* Right Column - Gallery Card */}
      <div className="h-full">
        <GalleryCard />
      </div>
    </Motion.div>
  );
};
