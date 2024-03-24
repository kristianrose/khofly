import {
  Button,
  Flex,
  Group,
  Paper,
  Select,
  SelectProps,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { DEFlag, USFlag } from "mantine-flagpack";

import classes from "../../styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useForm } from "@mantine/form";
import useToast from "@hooks/use-toast";
import RemixLink from "@components/RemixLink";
import { useInstanceStore } from "@store/instance";
import { IconSearch } from "@tabler/icons-react";
import { useEffect } from "react";

const icons: Record<string, React.ReactNode> = {
  [process.env.SEARXNG_URL_EU1!]: <DEFlag style={getIconStyle(20)} />,
  [process.env.SEARXNG_URL_US1!]: <USFlag style={getIconStyle(20)} />,
};

const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
  </Group>
);

const SettingsSearXNG = () => {
  const { domain, setDomain } = useInstanceStore((state) => ({
    domain: state.searXNGDomain,
    setDomain: state.setSearXNGDomain,
  }));

  const form = useForm({
    initialValues: {
      domain: "",
      select: "",
    },
    validate: {
      domain: (value) =>
        /^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : "Invalid URL",
    },
  });

  const { toast } = useToast();

  const handleSubmit = (values: typeof form.values) => {
    setDomain(values.domain);
    toast.show({ message: "URL changed!", color: "green" });
  };

  useEffect(() => {
    form.setFieldValue("domain", domain);

    if (
      [process.env.SEARXNG_URL_EU1, process.env.SEARXNG_URL_US1].includes(
        domain
      )
    ) {
      form.setFieldValue("select", domain);
    }
  }, [domain]);

  return (
    <Paper radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align="center" p="lg" mb={16}>
          <IconSearch style={getIconStyle(32)} />

          <Text fz={26} fw={600} ml="sm">
            SearXNG Domain
          </Text>
        </Flex>

        {/* Settings content */}
        <Stack px="lg" mb="xl">
          <TextInput
            placeholder="domain.com"
            size="md"
            className={classes.settings_input}
            {...form.getInputProps("domain")}
          />

          {!+process.env.NEXT_PUBLIC_IS_SELF_HOST! && (
            <Select
              className={classes.settings_select}
              label="Default instances"
              description="Pick one based on your location"
              placeholder="Instance location"
              value={form.values.select}
              onChange={(val) => {
                form.setFieldValue("select", val || "");
                form.setFieldValue("domain", val || "");
              }}
              data={[
                {
                  label: "Nuremberg, Germany",
                  value: process.env.SEARXNG_URL_EU1 || "1",
                },
                {
                  label: "Ashburn, USA",
                  value: process.env.SEARXNG_URL_US1 || "2",
                },
              ]}
              renderOption={renderSelectOption}
              leftSection={icons[form.values.select]}
            />
          )}
        </Stack>

        <Flex
          align="center"
          justify="space-between"
          py="sm"
          px="lg"
          className={classes.settings_footer}
        >
          <Text size="sm" c="dimmed">
            Change this to your own url for better privacy & less load for
            default instance.{" "}
            <Text component="span" c="blue">
              <RemixLink to={"/docs/self-host-searxng"}>Read more</RemixLink>
            </Text>
          </Text>

          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Paper>
  );
};

export default SettingsSearXNG;
