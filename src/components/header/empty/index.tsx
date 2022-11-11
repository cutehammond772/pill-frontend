import { Header } from "../../../layouts/header";
import { useHeader } from "../../../utils/hooks/header";

const EmptyHeaderSignature = "EmptyHeader";

const EmptyHeader = () => {
  const header = useHeader(EmptyHeaderSignature);
  return <Header title={header.title} />;
};

export { EmptyHeader, EmptyHeaderSignature };
