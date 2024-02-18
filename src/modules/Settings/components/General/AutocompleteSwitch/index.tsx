import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Select, Switch } from "@mantine/core";
import { IAutocompleteEngines, useGeneralStore } from "@store/general";

const AutocompleteSwitch = () => {
  const t = useTranslate();

  const {
    useAutocomplete,
    setUseAutocomplete,
    autocompleteEngine,
    setAutocompleteEngine,
  } = useGeneralStore((state) => ({
    useAutocomplete: state.useAutocomplete,
    setUseAutocomplete: state.setUseAutocomplete,
    autocompleteEngine: state.autocompleteEngine,
    setAutocompleteEngine: state.setAutocompleteEngine,
  }));

  return (
    <Flex align="center" gap="sm">
      {useAutocomplete && (
        <Select
          data={[
            {
              label: t("pages.settings.general.autocomplete_engine_google"),
              value: "google",
            },
            {
              label: t("pages.settings.general.autocomplete_engine_DDG"),
              value: "duckduckgo",
            },
            {
              label: t("pages.settings.general.autocomplete_engine_brave"),
              value: "brave",
            },
            {
              label: t("pages.settings.general.autocomplete_engine_qwant"),
              value: "qwant",
            },
          ]}
          value={autocompleteEngine}
          onChange={(val) => setAutocompleteEngine(val as IAutocompleteEngines)}
          w={150}
        />
      )}

      <Switch
        checked={useAutocomplete}
        onChange={(e) => setUseAutocomplete(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default AutocompleteSwitch;
