import React from "react";
import WikiSubtitle from "../../common/WikiSubtitle";
import WikiText from "../../common/WikiText";
import WikiLink from "../../common/WikiLink";
import { Alert, Code, Image } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const SectionVivaldi = () => {
  return (
    <>
      <WikiSubtitle>1. The easy way?</WikiSubtitle>

      <WikiText>
        Simply right-click in a search ﬁeld on any web page and choose 'Add as
        search engine' from the context menu. Then, type in the keyword you want
        to use and select 'Add' to save it.
      </WikiText>

      <Image
        src="https://vivaldi.com/wp-content/uploads/2016/11/addsearchengine_600.png"
        w="100%"
        maw={400}
        my="xl"
        alt="Vivaldi add search engine"
      />

      <WikiSubtitle>2. Another route</WikiSubtitle>

      <WikiText>
        You can add engines as well as edit, modify and manage all of your
        search settings. To do this, add them through preferences in Vivaldi
        Settings/Search. Here, you can modify and organize to your own
        preferences. With a little bit of magic, you can now start searching
        with your new custom search engine. Use the URLs below to add search
        engines from a few of our favourite sites.
      </WikiText>

      <WikiText>
        Example how to add Khofly{" "}
        <Code>https://khofly.com/search?q=%s&tab=general</Code>
      </WikiText>

      <Image
        src="https://vivaldi.com/wp-content/uploads/2016/11/searchsettings_600.png"
        w="100%"
        maw={500}
        my="xl"
        alt="Vivaldi add search engine"
      />

      <Alert
        mt="xl"
        variant="light"
        color="blue"
        title="Learn more"
        icon={<IconInfoCircle />}
      >
        You can read more about adding a search engine to Vivaldi at{" "}
        <WikiLink
          href="https://vivaldi.com/blog/search-favorite-websites-quickly/"
          label="official docs"
        />
        .
      </Alert>
    </>
  );
};

export default SectionVivaldi;
