type SponsorCardProps = {
  href: string;
  src: string;
};

export const SponsorCard = ({ src, href }: SponsorCardProps) => {
  return (
    <a href={href} className="cursor-pointer w-full md:w-auto" target="_blank">
      <div className="w-full px-8 md:w-77 h-50 rounded-2xl flex justify-center items-center bg-primary-100-white">
        <img src={src} className="md:max-w-58" />
      </div>
    </a>
  );
};
