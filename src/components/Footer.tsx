import CircleText from '@/components/CircleText';
import { FizziLogo } from '@/components/FizziLogo';

const Footer = () => {
  return (
    <div className="bg-[#FEE832] text-[#FE6334]">
      <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10">
        <FizziLogo />

        <div className="absolute size-28 right-24 top-0 origin-center -translate-y-14 md:size-48 md:-translate-y-28">
          <CircleText />
        </div>
      </div>
    </div>
  );
};

export default Footer;
