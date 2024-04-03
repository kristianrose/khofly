import { useState } from "react";
import { IAWrapper } from "../wrapper";
import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Paper,
  Popover,
  Text,
  Transition,
} from "@mantine/core";

import { BTN_VALUES } from "./data";
import { calculate } from "./utils";
import { useWindowEvent } from "@mantine/hooks";
import { IconEqual, IconHistory } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const countDecimals = (value: number) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

const calculateResult = (equation: string): string | number => {
  // Calculate the result of the equation
  const { success, result } = calculate(equation);

  if (success && typeof result === "number") {
    const resDecimals = Math.min(countDecimals(result), 10);

    // Calculated result
    return result.toFixed(resDecimals);
  } else {
    // Error message
    return result;
  }
};

const Calculator = () => {
  // Calculator state
  const [equation, setEquation] = useState<string>("");
  const [result, setResult] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<
    { equation: string; result: string }[]
  >([]);

  const [variant, setVariant] = useState<"basic" | "scientific">("basic");

  const handlePress = (btn: string) => {
    // Calculate equation
    if (btn === "equals") {
      // Check if equation exists
      if (!equation.length) return;

      const calculatedResult = calculateResult(equation);

      setHistory((h) => [...h, { equation, result: `${calculatedResult}` }]);
      setResult(`${calculatedResult}`);
    }

    // Switch basic/scientific
    if (btn === "switch") {
      setVariant((v) => (v === "basic" ? "scientific" : "basic"));
    }

    // Clear all
    if (btn === "clear") {
      setEquation("");
      setResult("");
    }

    // Clear last
    if (btn === "backspace") {
      // Continue equation if result exists
      if (result.length) return setResult("");

      // Handle 3 letter operations
      if (["sin(", "cos(", "tan(", "log("].includes(equation.slice(-4)))
        return setEquation(`${equation.substring(0, equation.length - 4)}`);

      // Handle 2 letter operations
      if (["ln("].includes(equation.slice(-3)))
        return setEquation(`${equation.substring(0, equation.length - 3)}`);

      return setEquation(`${equation.substring(0, equation.length - 1)}`);
    }

    // Set numbers
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(btn)) {
      // Continue equation if result exists
      if (result.length) setResult("");

      if (equation.slice(-1) === ")") return setEquation(`${equation}*${btn}`);

      return setEquation(`${equation}${btn}`);
    }

    // Set operation
    if (["+", "-", "*", "/", "%"].includes(btn)) {
      // Continue equation if result exists
      if (result.length) setResult("");

      // Only one operation
      if (
        ["+", "-", "*", "/", "%"].includes(equation.slice(-1)) &&
        ["+", "*", "/", "%"].includes(btn)
      )
        return setEquation(
          `${equation.substring(0, equation.length - 1)}${btn}`
        );

      // Handle negative numbers, part 2
      if (!["+", "*", "/", "%"].includes(equation.slice(-1)) && btn === "-")
        return setEquation(`${equation}-`);

      // Handle negative numbers, part 2
      if (["+", "*", "/", "%"].includes(equation.slice(-1)) && btn === "-")
        return setEquation(`${equation}(-`);

      return setEquation(`${equation}${btn}`);
    }

    // Set .
    if (btn === ".") {
      // Check only one dot
      if (equation.slice(-1) === ".") return;

      // Continue equation if result exists
      if (result.length) setResult("");

      return setEquation(`${equation}.`);
    }

    // Set parentheses
    if (["(", ")"].includes(btn)) {
      // Continue equation if result exists
      if (result.length) setResult("");

      return setEquation(`${equation}${btn}`);
    }

    // Set functions
    if (["sin", "cos", "tan", "log", "ln"].includes(btn)) {
      // Continue equation if result exists
      if (result.length) setResult("");

      return setEquation(`${equation}${btn}(`);
    }
  };

  // Handle keypress
  useWindowEvent("keydown", (e) => {
    handlePress(
      // Handle result
      e.key === "Enter"
        ? "equals"
        : // Handle backspace
        e.key === "Backspace"
        ? "backspace"
        : e.key
    );
  });

  return (
    <IAWrapper>
      <Paper p="xs" w="100%" h={100} pos="relative">
        <Popover
          opened={historyOpen}
          onChange={setHistoryOpen}
          width={400}
          position="bottom-start"
          shadow="md"
        >
          <Popover.Target>
            <ActionIcon
              onClick={() => setHistoryOpen((o) => !o)}
              size="lg"
              variant="subtle"
              color="gray"
              pos="absolute"
            >
              <IconHistory style={getIconStyle(24)} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            {history.map((val) => (
              <Flex align="center" justify="flex-start" gap={4} my="xs">
                <Button
                  onClick={() => {
                    setEquation(val.equation);
                    setResult("");
                    setHistoryOpen(false);
                  }}
                  size="xs"
                  c="gray"
                  variant="outline"
                >
                  <Text size="xs" fw={600} truncate="end">
                    {val.equation}
                  </Text>
                </Button>

                <IconEqual style={getIconStyle(22)} stroke={1.5} />

                <Button
                  onClick={() => {
                    setEquation(val.result);
                    setResult("");
                    setHistoryOpen(false);
                  }}
                  size="xs"
                  c="gray"
                  variant="outline"
                >
                  <Text size="xs" fw={600} truncate="end">
                    {val.result}
                  </Text>{" "}
                </Button>
              </Flex>
            ))}
          </Popover.Dropdown>
        </Popover>

        <Flex h="100%" justify="flex-end" align="flex-end" direction="column">
          <Text
            c={!result.length ? "" : "dimmed"}
            size={!result.length ? "xl" : "md"}
            fw={!result.length ? 600 : 400}
          >
            {equation}
          </Text>

          {/* Slide in result */}
          <Transition transition="pop" duration={300} mounted={!!result.length}>
            {(transitionStyles) => (
              <Text fz={28} fw={600} style={transitionStyles}>
                {result}
              </Text>
            )}
          </Transition>
        </Flex>
      </Paper>
      {/* Calculator keyboard */}
      {BTN_VALUES(variant).map((gridBtnRow, i) => (
        <Grid key={i} grow gutter="xs" mt="xs">
          {gridBtnRow.map((gridBtn) => {
            if (gridBtn.variant === "scientific" && variant === "basic")
              return null;
            else
              return (
                <Grid.Col key={gridBtn.value} span={"auto"}>
                  <Button
                    w="100%"
                    color={gridBtn.color}
                    onClick={() => handlePress(gridBtn.value)}
                    disabled={[
                      "deg",
                      "rad",
                      "2nd",
                      "to_the_power",
                      "ln",
                    ].includes(gridBtn.value)}
                  >
                    {gridBtn.label}
                  </Button>
                </Grid.Col>
              );
          })}
        </Grid>
      ))}
    </IAWrapper>
  );
};

export default Calculator;
