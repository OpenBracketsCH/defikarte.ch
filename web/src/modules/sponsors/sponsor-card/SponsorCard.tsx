type SponsorCardProps = {
  href: string;
  src: string;
};

export const SponsorCard = ({ src, href }: SponsorCardProps) => {
  return (
    <a href={href} className="cursor-pointer" target="__blank">
      <div className="w-77 h-50 rounded-2xl flex justify-center items-center bg-primary-100-white">
        <img src={src} className="max-w-58" />
      </div>
    </a>
  );
};
