import { Header } from "../../../layouts/header";
import { useHeader } from "../../../utils/hooks/header";

const EmptyHeaderSignature = "EmptyHeader";

const EmptyHeader = () => {
  useHeader(EmptyHeaderSignature);
  return <Header />;
};

export { EmptyHeader, EmptyHeaderSignature };
