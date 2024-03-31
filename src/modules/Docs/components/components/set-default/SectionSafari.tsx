import WikiText from "../../common/WikiText";
import WikiLink from "../../common/WikiLink";
import { Text } from "@mantine/core";
import RemixLink from "@components/RemixLink";

const SectionSafari = () => {
  return (
    <>
      <WikiText>1. Take a deep breath.</WikiText>

      <WikiText>1.1. Ask Apple® for permission to install Firefox.</WikiText>

      <WikiText>
        2. Open Firefox{" "}
        <WikiLink
          href="https://www.mozilla.org/en-US/firefox/new/"
          label="download page"
        />{" "}
        and proceed with installation.
      </WikiText>

      <WikiText>
        3. Once the installation is finished follow the steps from{" "}
        <RemixLink to={"/docs/set-default?browser=Firefox"}>
          <Text component="span" c="blue">
            this page
          </Text>
        </RemixLink>
      </WikiText>
    </>
  );
};

export default SectionSafari;
