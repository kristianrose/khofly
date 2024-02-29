import PagePrivacy from "@module/Privacy";
import PrivacyPolicy290224 from "@module/Privacy/components/policy-29-02-2024";
import { useParams } from "@remix-run/react";

export default function Privacy() {
  const params = useParams();
  const version = params.version as string;

  const page = {
    "290224": <PrivacyPolicy290224 />,
  }[version];

  return page || <PagePrivacy />;
}
