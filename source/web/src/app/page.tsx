import GlobalContainer from "@/components/global-container";
import Menu from "@/components/menu";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <GlobalContainer>
      <Menu />
      <Text>Hello World</Text>
    </GlobalContainer>
  );
}
