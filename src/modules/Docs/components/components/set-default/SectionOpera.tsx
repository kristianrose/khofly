import WikiText from "../../common/WikiText";
import WikiLink from "../../common/WikiLink";
import { Text } from "@mantine/core";
import RemixLink from "@components/RemixLink";

const SectionOpera = () => {
  return (
    <>
      <WikiText>1. 深呼吸。</WikiText>

      <WikiText>
        2. 打开 Firefox{" "}
        <WikiLink
          href="https://www.mozilla.org/en-US/firefox/new/"
          label="download page"
        />{" "}
        并继续安装.
      </WikiText>

      <WikiText>
        3. 安装完成后，请按照以下步骤操作{" "}
        <RemixLink to={"/docs/set-default?browser=Firefox"}>
          <Text component="span" c="blue">
            this page
          </Text>
        </RemixLink>
      </WikiText>
    </>
  );
};

export default SectionOpera;
