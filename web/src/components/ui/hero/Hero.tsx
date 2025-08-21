import { Button } from '../button/Button';
import { ContentWrapper } from '../content-wrapper/ContentWrapper';
import { Text } from '../text/Text';

type HeroProps = {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonIcon: string;
};

export const Hero = ({ title, description, image, buttonText, buttonIcon }: HeroProps) => {
  return (
    <>
      <ContentWrapper variant="green" paddingY="regular" className="flex-col 2xl:w-[1200px]">
        <Text size="x-large" variant="tint" weight="bold" center className="pb-6">
          {title}
        </Text>
        <Text size="regular" variant="white" weight="light" center className="pb-10">
          {description}
        </Text>
        <Button icon={buttonIcon} size="large">
          {buttonText}
        </Button>
        <img src={image} className="mt-20 rounded-2xl" />
      </ContentWrapper>
    </>
  );
};
