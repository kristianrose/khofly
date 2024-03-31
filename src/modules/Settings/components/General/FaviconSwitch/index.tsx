import { Switch } from "@mantine/core";
import { useGeneralStore } from "@store/general";

const FaviconSwitch = () => {
  const { displayFavicon, setDisplayFavicon } = useGeneralStore((state) => ({
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
