import { useGetCalcConversionTableQuery } from '../../hooks';

type ConversionTableSettingBoxProps = {
  serviceID: string;
};
const ConversionTableSettingBox = ({
  serviceID,
}: ConversionTableSettingBoxProps) => {
  const { data } = useGetCalcConversionTableQuery(serviceID);

  return <div></div>;
};

export default ConversionTableSettingBox;
