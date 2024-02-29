import React from "react";
import WikiText from "../../common/WikiText";
import { Alert, Image } from "@mantine/core";
import { IconDots, IconInfoCircle, IconSettings } from "@tabler/icons-react";
import WikiLink from "../../common/WikiLink";
import { getIconStyle } from "@utils/functions/iconStyle";

const SectionEdge = () => {
  return (
    <>
      <WikiText>
        1. Perform a search in the address bar using the search engine you want
        to set as your default.
      </WikiText>

      <WikiText>
        2. Select <b>Settings and more</b>{" "}
        <IconDots style={getIconStyle(18, true)} display="inline-block" /> and
        then <b>Settings</b>{" "}
        <IconSettings style={getIconStyle(18, true)} display="inline-block" />.
      </WikiText>

      <Image
        src="https://support.content.office.net/en-us/media/14f961c2-7d88-cfec-7ab0-8eca08b9fa42.png"
        w="100%"
        maw={300}
        my="xl"
        alt="Edge add search engine"
      />

      <WikiText>
        3. Select <b>Privacy, search, and services</b>.
      </WikiText>

      <Image
        src="https://support.content.office.net/en-us/media/6b96f46b-2136-4228-9aa6-1516ba788730.png"
        w="100%"
        maw={500}
        my="xl"
        alt="Edge add search engine"
      />

      <WikiText>
        4. Scroll all the way down to the <b>Services</b> section and select{" "}
        <b>Address bar and search</b>.
      </WikiText>

      <Image
        src="https://support.content.office.net/en-us/media/df86f25a-9a1e-4c54-b3df-ee7db7d6dae4.png"
        w="100%"
        maw={500}
        my="xl"
        alt="Edge add search engine"
      />

      <WikiText>
        5. Choose your preferred search engine from the{" "}
        <b>Search engine used in the address bar</b> menu.
      </WikiText>

      <Alert
        mt="xl"
        variant="light"
        color="blue"
        title="Learn more"
        icon={<IconInfoCircle />}
      >
        You can read more about adding a search engine to M$ Edge at{" "}
        <WikiLink
          href="https://support.microsoft.com/en-us/microsoft-edge/change-your-default-search-engine-in-microsoft-edge-cccaf51c-a4df-a43e-8036-d4d2c527a791"
          label="official docs"
        />
        .
      </Alert>
    </>
  );
};

export default SectionEdge;
