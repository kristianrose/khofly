import { Center, Container, Flex, Title } from "@mantine/core";
import SearchBar from "./components/SearchBar";

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";

const PageIndex = () => {
  const t = useTranslate();

  return (
    <Container className={classes.index_page} size="lg" py={80}>
      <Center className={classes.center}>
        <Flex
          className={classes.flex}
          align="center"
          direction="column"
          pb={150}
        >
          <Title className={classes.app_name} mb="xl">
            {!+process.env.IS_SELF_HOST!
              ? t("_common.app_name")
              : process.env.APP_NAME}
          </Title>

          <SearchBar />
        </Flex>
      </Center>
    </Container>
  );
};

export default PageIndex;
