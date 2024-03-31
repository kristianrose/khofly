import { useBrowser } from "@hooks/use-browser";
import {
  Center,
  Container,
  Loader,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBrandChrome,
  IconBrandEdge,
  IconBrandFirefox,
  IconBrandOpera,
  IconBrandSafari,
  IconBrandVivaldi,
  IconWorldWww,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import SectionFirefox from "./components/set-default/SectionFirefox";
import SectionChromium from "./components/set-default/SectionChromium";
import SectionEdge from "./components/set-default/SectionEdge";
import SectionSafari from "./components/set-default/SectionSafari";
import SectionOpera from "./components/set-default/SectionOpera";
import WikiLink from "./common/WikiLink";
import { useSearchParams } from "@remix-run/react";
import WikiTitle from "./common/WikiTitle";
import SectionVivaldi from "./components/set-default/SectionVivaldi";

const DocsResourcesSetDefault = () => {
  const [searchParams] = useSearchParams();
  const browser = useBrowser();
  const theme = useMantineTheme();

  const paramsBrowser =
    searchParams.get("browser")?.toLocaleLowerCase() ||
    browser.toLocaleLowerCase();

  return (
    <Container size="lg" p="xl" pb={100}>
      {paramsBrowser === "firefox" && (
        <>
          <WikiTitle
            leftSection={
              <IconBrandFirefox
                style={getIconStyle(48)}
                color={theme.colors.orange[5]}
              />
            }
          >
            Adding search engine to Firefox
          </WikiTitle>

          <SectionFirefox />
        </>
      )}

      {["chromium", "chrome"].includes(paramsBrowser) && (
        <>
          <WikiTitle
            leftSection={
              <IconBrandChrome
                style={getIconStyle(48)}
                color={theme.colors.blue[4]}
              />
            }
          >
            Adding search engine to Chromium
          </WikiTitle>

          <SectionChromium />
        </>
      )}

      {paramsBrowser === "edge" && (
        <>
          <WikiTitle
            leftSection={
              <IconBrandEdge
                style={getIconStyle(48)}
                color={theme.colors.blue[5]}
              />
            }
          >
            Adding search engine to Edge
          </WikiTitle>

          <SectionEdge />
        </>
      )}

      {paramsBrowser === "safari" && (
        <>
          <WikiTitle
            leftSection={
              <IconBrandSafari
                style={getIconStyle(48)}
                color={theme.colors.blue[5]}
              />
            }
          >
            Adding search engine to Safari
          </WikiTitle>

          <SectionSafari />
        </>
      )}

      {paramsBrowser === "vivaldi" && (
        <>
          <WikiTitle
            leftSection={
              <IconBrandVivaldi
                style={getIconStyle(48)}
                color={theme.colors.red[4]}
              />
            }
          >
            Adding search engine to Vivaldi
          </WikiTitle>

          <SectionVivaldi />
        </>
      )}

      {paramsBrowser === "opera" && (
        <>
          <WikiTitle
            leftSection={
              <IconBrandOpera
                style={getIconStyle(48)}
                color={theme.colors.red[6]}
              />
            }
          >
            Adding search engine to Opera
          </WikiTitle>

          <SectionOpera />
        </>
      )}

      {["ie", "samsung", "unknown"].includes(paramsBrowser) && (
        <>
          <WikiTitle
            leftSection={
              <IconWorldWww
                style={getIconStyle(48)}
                color={theme.colors.blue[4]}
              />
            }
          >
            Adding search engine to [your browser]
          </WikiTitle>

          <WikiLink
            href={`https://khofly.com/search?q=How to add a custom search engine to ${browser}`}
            label="How to add a custom search engine to [your browser]"
          />
        </>
      )}

      {["loading"].includes(paramsBrowser) && (
        <Center mt="xl">
          <Loader size="xl" />
        </Center>
      )}
    </Container>
  );
};

export default DocsResourcesSetDefault;
