import GlobalContainer from "@/components/global-container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <GlobalContainer>
      <Heading>Library!</Heading>
      <Text variant="light">Hello World</Text>
    </GlobalContainer>
  );
}
