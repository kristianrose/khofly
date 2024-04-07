import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const FaviconSwitch = () => {
  const { displayFavicon, setDisplayFavicon } = useSettingsStore((state) => ({
    displayFavicon: state.displayFavicon,
    setDisplayFavicon: state.setDisplayFavicon,
  }));

  return (
    <Switch
      checked={displayFavicon}
      onChange={(e) => setDisplayFavicon(e.currentTarget.checked)}
    />
  );
};

export default FaviconSwitch;
